import { Link } from 'react-router-dom'
import { useApp } from '../hooks/useApp'

export default function ReadHistory() {
  const { getHistory, posts } = useApp()

  const historyIds = getHistory()

  const readPosts = historyIds
    .map(id => posts.find(p => p.id === id))
    .filter(Boolean)

  return (
    <div>

      <div className="page-header">
        <h1 className="page-title">📖 Read History</h1>
        <p className="page-subtitle">
          Posts you've opened — most recent first.
        </p>
      </div>

      {readPosts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <p>You haven't read any posts yet.</p>
          <Link to="/" className="hero-btn">Browse the Feed</Link>
        </div>
      ) : (
        <div className="history-list">
          {readPosts.map((post, index) => {

            const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'short', day: 'numeric',
            })

            const initials = post.author
              .split(' ')
              .map(w => w[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)

            return (
              <div key={`${post.id}-${index}`} className="history-item">

                <div style={{
                  minWidth: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--color-tag-bg)',
                  color: 'var(--color-tag-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {index + 1}
                </div>

                <div className="avatar" style={{ width: '34px', height: '34px', fontSize: '0.8rem', flexShrink: 0 }}>
                  {initials}
                </div>

                <div className="history-item-info">
                  <div className="history-item-title">
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </div>
                  <div className="history-item-meta">
                    <span className="tag-badge" style={{ marginRight: '6px' }}>{post.tag}</span>
                    by {post.author} · {formattedDate}
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      )}

    </div>
  )
}