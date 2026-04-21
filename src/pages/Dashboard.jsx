import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp'

export default function Dashboard() {
  const { currentUser, posts, deletePost } = useApp()
  const navigate = useNavigate()

  // Filter to only show this user's posts
  const myPosts = posts.filter(p => p.authorId === currentUser.id)

  function handleDelete(postId, postTitle) {
    const confirmed = window.confirm(`Delete "${postTitle}"? This cannot be undone.`)
    if (!confirmed) return
    deletePost(postId)
  }

  const initials = currentUser.username.slice(0, 2).toUpperCase()

  return (
    <div>

      <div className="home-hero" style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '16px' }}>

        <div className="avatar" style={{ width: '54px', height: '54px', fontSize: '1.2rem', flexShrink: 0 }}>
          {initials}
        </div>
        <div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 700 }}>
            {currentUser.username}
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', margin: 0 }}>
            {myPosts.length} post{myPosts.length !== 1 ? 's' : ''} published
          </p>
        </div>
      </div>

      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="page-title">My Posts</h2>
        <Link to="/create" className="hero-btn">+ New Post</Link>
      </div>

      {myPosts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <p>You haven't published anything yet.</p>
          <Link to="/create" className="hero-btn">Write your first TIL</Link>
        </div>
      ) : (
        myPosts.map(post => {
          const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
          })

          return (
            <div key={post.id} className="dashboard-post-item">

              <div className="dashboard-post-info">
                <div className="dashboard-post-title">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </div>
                <div className="dashboard-post-meta">
                  <span className="tag-badge" style={{ marginRight: '8px' }}>{post.tag}</span>
                  {formattedDate}
                </div>
              </div>

              <div className="dashboard-actions">
                <button
                  className="btn btn-edit"
                  onClick={() => navigate(`/edit/${post.id}`)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(post.id, post.title)}
                >
                  🗑️ Delete
                </button>
              </div>

            </div>
          )
        })
      )}
    </div>
  )
}