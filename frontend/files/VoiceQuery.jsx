import { useState } from 'react'
import './VoiceQuery.css'

/**
 * Allows the user to type a query.
 * onSubmit(query) will be wired to the WebSocket send in Phase 6.
 */
export default function VoiceQuery({ onSubmit }) {
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(false)

  function handleKeyDown(e) {
    if (e.key === 'Enter' && query.trim()) {
      onSubmit?.(query.trim())
      setQuery('')
    }
    if (e.key === 'Escape') {
      setVisible(false)
      setQuery('')
    }
  }

  return (
    <div className={`voice-query${visible ? ' voice-query--open' : ''}`}>
      {visible ? (
        <div className="voice-query__input-wrap hud-frame">
          <span className="voice-query__prompt" aria-hidden="true">&gt;_</span>
          <input
            className="voice-query__input"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something…"
            autoFocus
            aria-label="Voice query input — press Enter to send, Escape to close"
          />
        </div>
      ) : (
        <button
          className="voice-query__toggle"
          onClick={() => setVisible(true)}
          aria-label="Open query input"
        >
          ASK
        </button>
      )}
    </div>
  )
}
