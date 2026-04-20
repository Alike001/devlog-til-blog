import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp'

export default function Register() {
  const { register, currentUser } = useApp()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')

  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  if (currentUser) {
    navigate('/')
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!username.trim() || !password.trim() || !confirm.trim()) {
      setError('Please fill in all fields.')
      return
    }

    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const result = register(username.trim(), password)
    setLoading(false)

    if (result.success) {
      setSuccess('Account created! Redirecting...')
      setTimeout(() => navigate('/'), 1000)
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="form-card">

      <h1 className="form-title">Join DevLog TIL ✍️</h1>
      <p className="form-subtitle">
        Create an account and start sharing what you learn every day.
      </p>

      {error   && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="e.g. aisha_dev"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm">Confirm Password</label>
          <input
            id="confirm"
            type="password"
            placeholder="Repeat your password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

      </form>

      <p style={{ marginTop: '16px', fontSize: '0.9rem', textAlign: '  center' }}>
        Already have an account?{' '}
        <Link to="/login">Log in</Link>
      </p>

    </div>
  )
}