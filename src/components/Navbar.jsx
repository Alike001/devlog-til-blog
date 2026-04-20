import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp'

export default function Navbar() {
  const { currentUser, logout } = useApp()
  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  // Generate initials for the logged-in user's avatar
  const initials = currentUser
    ? currentUser.username.slice(0, 2).toUpperCase()
    : ''

  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        💻 DevLog <span className="navbar-logo-til">TIL</span>
      </Link>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label="Toggle menu">
        {menuOpen ? '✕' : '☰'}
      </button>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>

        <Link to="/" onClick={closeMenu}>Feed</Link>

        {currentUser ? (
          <>
            <Link to="/create" onClick={closeMenu}>+ New Post</Link>
            <Link to="/dashboard" onClick={closeMenu}>My Posts</Link>
            <Link to="/history" onClick={closeMenu}>History</Link>

            <div className="nav-avatar">{initials}</div>

            <button className="nav-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>Login</Link>
            <Link to="/register" className="nav-register-btn" onClick={closeMenu}>
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  )
}