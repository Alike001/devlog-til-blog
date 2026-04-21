import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useApp } from '../hooks/useApp'

export default function PostDetail() {
  const { id } = useParams() // grab the :id from the URL
  const { posts, currentUser, deletePost, addToHistory } = useApp()
  const navigate = useNavigate()

  // Find the post that matches the URL id
  const post = posts.find(p => p.id === id)

  // As soon as this page loads, add the post to read history
  useEffect(() => {
    if (post && currentUser) {
      addToHistory(post.id)
    }
  }, [post?.id, currentUser?.id, addToHistory, currentUser, post])

  if (!post) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <p>Post not found. It may have been deleted.</p>
        <Link to="/" className="hero-btn">Back to Feed</Link>
      </div>
    )
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  const initials = post.author
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  // Is the logged-in user the author of this post?
  const isOwner = currentUser && currentUser.id === post.authorId

  function handleDelete() {
    // Ask the user to confirm before permanently deleting
    const confirmed = window.confirm('Are you sure you want to delete this post?')
    if (!confirmed) return
    deletePost(post.id)
    navigate('/')
  }

  return (
    <div>
      <Link to="/" className="back-link">← Back to Feed</Link>

      <div className="post-detail">

        <div className="post-detail-header">
          <div className="avatar">{initials}</div>
          <div>
            <div className="post-detail-author">{post.author}</div>
            <div className="post-detail-date">{formattedDate}</div>
          </div>
        </div>

        <span className="tag-badge">{post.tag}</span>

        <h1 className="post-detail-title">{post.title}</h1>

        <p className="post-detail-body">{post.body}</p>

        {isOwner && (
          <div className="post-detail-actions">
            <button
              className="btn btn-edit"
              onClick={() => navigate(`/edit/${post.id}`)}
            >
              ✏️ Edit Post
            </button>
            <button className="btn btn-delete" onClick={handleDelete}>
              🗑️ Delete Post
            </button>
          </div>
        )}

      </div>
    </div>
  )
}