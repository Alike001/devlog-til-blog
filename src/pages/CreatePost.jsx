import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp'

const TAGS = ['CSS', 'JavaScript', 'React', 'Git', 'Blockchain', 'Tech']

export default function CreatePost() {
  const { createPost } = useApp()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tag, setTag] = useState(TAGS[0])

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Please add a title.')
      return
    }
    if (!body.trim()) {
      setError('Please write something in the body.')
      return
    }
    if (body.trim().length < 30) {
      setError('Body must be at least 30 characters. Tell us more!')
      return
    }

    setLoading(true)

    // createPost() saves the post and returns its new ID
    const newId = createPost(title.trim(), body.trim(), tag)

    setLoading(false)

    navigate(`/post/${newId}`)
  }

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>

      <div className="page-header">
        <h1 className="page-title">✍️ Share What You Learned</h1>
        <p className="page-subtitle">
          Write your TIL post below. Be specific — the best posts teach one clear thing.
        </p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-card" style={{ maxWidth: '100%', margin: 0 }}>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="title">Post Title</label>
            <input
              id="title"
              type="text"
              placeholder='e.g. "TIL: How async/await works in JavaScript"'
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
              placeholder="Explain what you learned today. Use plain text — you can break it into paragraphs with Enter."
              value={body}
              onChange={e => setBody(e.target.value)}
            />

            <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
              {body.length} characters
            </span>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>

        </form>
      </div>
    </div>
  )
}