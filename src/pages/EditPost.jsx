import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useApp } from '../hooks/useApp'

const TAGS = ['CSS', 'JavaScript', 'React', 'Git', 'Blockchain', 'Tech']

export default function EditPost() {
  const { id } = useParams()
  const { posts, currentUser, editPost } = useApp()
  const navigate = useNavigate()

  const post = posts.find(p => p.id === id)

  const [title, setTitle] = useState(post ? post.title : '')
  const [body, setBody] = useState(post ? post.body : '')
  const [tag, setTag] = useState(post ? post.tag : TAGS[0])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!post) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <p>Post not found.</p>
        <Link to="/" className="hero-btn">Back to Feed</Link>
      </div>
    )
  }

  if (currentUser?.id !== post.authorId) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🚫</div>
        <p>You can only edit your own posts.</p>
        <Link to="/" className="hero-btn">Back to Feed</Link>
      </div>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Title cannot be empty.')
      return
    }
    if (!body.trim() || body.trim().length < 30) {
      setError('Body must be at least 30 characters.')
      return
    }

    setLoading(true)
    editPost(id, title.trim(), body.trim(), tag)
    setLoading(false)

    navigate(`/post/${id}`)
  }

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>

      <div className="page-header">
        <h1 className="page-title">Edit Post</h1>
        <p className="page-subtitle">Update your TIL post below.</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-card" style={{ maxWidth: '100%', margin: 0 }}>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="title">Post Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="tag">Topic Tag</label>
            <select
              id="tag"
              value={tag}
              onChange={e => setTag(e.target.value)}
            >
              {TAGS.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="body">What did you learn?</label>
            <textarea
              id="body"
              value={body}
              onChange={e => setBody(e.target.value)}
            />
            <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
              {body.length} characters
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              className="btn"
              style={{ background: 'var(--color-border)', flex: 1 }}
              onClick={() => navigate(`/post/${id}`)}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}