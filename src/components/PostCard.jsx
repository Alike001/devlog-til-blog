import { Link } from 'react-router-dom'

export default function PostCard({ post }) {

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Show only the first 150 characters of the body as a preview
  const preview = post.body.length > 150
    ? post.body.slice(0, 150) + '...'
    : post.body

  // Generate initials from the author's name for the avatar
  const initials = post.author
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="post-card">

      <div className="post-card-header">
        <div className="avatar">{initials}</div>
        <div className="post-card-meta">
          <span className="post-card-author">{post.author}</span>
          <span className="post-card-date">{formattedDate}</span>
        </div>
      </div>

      <span className="tag-badge">{post.tag}</span>

      <h2 className="post-card-title">{post.title}</h2>

      <p className="post-card-preview">{preview}</p>

      <Link to={`/post/${post.id}`} className="read-more-link">
        Read more →
      </Link>

    </div>
  )
}