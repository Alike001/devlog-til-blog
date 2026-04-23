import { createContext, useState, useEffect } from 'react'
import { KEYS, SEED_POSTS, load, save } from '../utils/storage'

const AppContext = createContext()

// It holds all shared state and exposes functions that any page or component can call.
export function AppProvider({ children }) {

  // who is currently logged in?
  const [currentUser, setCurrentUser] = useState(() =>
    load(KEYS.currentUser, null)
  )

  // blog posts
  const [posts, setPosts] = useState(() => {
    const saved = load(KEYS.posts, null)
    // If no posts exist yet, load the seed posts so the app isn't empty
    if (!saved || saved.length === 0) {
      save(KEYS.posts, SEED_POSTS)
      return SEED_POSTS
    }
    return saved
  })

  // Keep localStorage in sync whenever posts change
  useEffect(() => { save(KEYS.posts, posts) }, [posts])

  function register(username, password) {
    const users = load(KEYS.users, [])

    const exists = users.find(u => u.username === username)
    if (exists) return { success: false, message: 'Username already taken.' }

    const newUser = {
      id: Date.now().toString(),
      username,
      password,
    }

    save(KEYS.users, [...users, newUser])
    setCurrentUser(newUser)
    save(KEYS.currentUser, newUser)
    return { success: true }
  }

  function login(username, password) {
    const users = load(KEYS.users, [])
    const user = users.find(
      u => u.username === username && u.password === password
    )

    if (!user) return { success: false, message: 'Invalid username or password.' }

    setCurrentUser(user)
    save(KEYS.currentUser, user)
  }

  function logout() {
    setCurrentUser(null)
    localStorage.removeItem(KEYS.currentUser)
  }

  function createPost(title, body, tag) {
    const newPost = {
      id: Date.now().toString(),
      title,
      body,
      tag,
      author: currentUser.username,
      authorId: currentUser.id,
      createdAt: new Date().toISOString(),
    }
    const updated = [newPost, ...posts]
    setPosts(updated)
    return newPost.id
  }

  function editPost(id, title, body, tag) {
    setPosts(prev =>
      prev.map(p => p.id === id ? { ...p, title, body, tag } : p)
    )
  }
  
  function deletePost(id) {
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  //Add a post to read history
   function addToHistory(postId) {
    if (!currentUser) return
    const key = `devlog_history_${currentUser.id}`
    const prev = load(key, [])
    // Remove duplicate then add to front (most recent first)
    const updated = [postId, ...prev.filter(id => id !== postId)]
    save(key, updated)
  }

   function getHistory() {
    if (!currentUser) return []
    const key = `devlog_history_${currentUser.id}`
    return load(key, [])
  }

  const value = {
    currentUser,
    posts,
    history,
    register,
    login,
    logout,
    createPost,
    editPost,
    deletePost,
    addToHistory,
    getHistory,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppContext }
