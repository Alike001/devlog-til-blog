import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp'

export default function Login() {
  const { login, currentUser } = useApp()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)

  if (currentUser) {
    navigate('/')
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault() // stop the page from refreshing
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Please fill in both fields.')
      return
    }

    setLoading(true)
    const result = login(username.trim(), password)
    setLoading(false)

    if (result.success) {
      navigate('/')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="form-card">

      <h1 className="form-title">Welcome back</h1>
      <p className="form-subtitle">Log in to share what you learned today.</p>

      {error && <div className="alert alert-error">{error}</div>}

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
            placeholder="Your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>

      </form>

      <p style={{ marginTop: '16px', fontSize: '0.9rem', textAlign: 'center' }}>
        No account?{' '}
        <Link to="/register">Create an account</Link>
      </p>

    </div>
  )
}