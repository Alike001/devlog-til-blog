import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import PostCard from '../components/PostCard'

const TAGS = ['All', 'CSS', 'JavaScript', 'React', 'Git', 'Blockchain', 'Tech']

export default function Home() {
  const { posts, currentUser } = useApp()

  const [activeTag, setActiveTag] = useState('All')

  // Filter posts by the selected tag
  const filteredPosts = activeTag === 'All'
    ? posts
    : posts.filter(post => post.tag === activeTag)

  return (
    <div>
      <div className="home-hero">
        <h1>💻 Coding TIL Board</h1>
        <p>
          A place for developers to share what they learned today —
          in React, CSS, Git, JavaScript, Blockchain, and beyond.
        </p>

        {currentUser ? (
          <Link to="/create" className="hero-btn">+ Share What You Learned</Link>
        ) : (
          <Link to="/register" className="hero-btn">Join & Start Sharing</Link>
        )}
      </div>

      <div className="page-header">
        <h2 className="page-title">Recent Posts</h2>
        <p className="page-subtitle">
          {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="tag-filter-bar">
        {TAGS.map(tag => (
          <button
            key={tag}
            className={`tag-filter-btn ${activeTag === tag ? 'active' : ''}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <p>No posts yet for <strong>{activeTag}</strong>.</p>
          {currentUser && (
            <Link to="/create" className="hero-btn">Be the first to post</Link>
          )}
        </div>
      ) : (
        filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      )}

    </div>
  )
}