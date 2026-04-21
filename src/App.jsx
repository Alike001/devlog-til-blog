import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import PostDetail from './pages/PostDetail'
import Dashboard from './pages/Dashboard'
import ReadHistory from './pages/ReadHistory'

function App() {
  return (
    <AppProvider>
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/create" element={
            <ProtectedRoute><CreatePost /></ProtectedRoute>
          } />
          <Route path="/edit/:id" element={
            <ProtectedRoute><EditPost /></ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute><ReadHistory /></ProtectedRoute>
          } />
        </Routes>
      </main>
    </AppProvider>
  )
}

export default App
