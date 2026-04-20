import { Navigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp'

// If the user is NOT logged in, it redirects them to the login page.
// If the user IS logged in, it shows whatever page was requested.
export default function ProtectedRoute({ children }) {
  const { currentUser } = useApp()

  // Not logged in? Send them to login page immediately.
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }
  
  // Logged in? show the actual page.
  return children
}