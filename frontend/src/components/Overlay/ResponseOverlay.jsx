import { useApp } from '../../context/AppContext'
import './ResponseOverlay.css'

export default function ResponseOverlay() {
  const { lastResponse } = useApp()

  if (!lastResponse) return null

  return (
    <div className="response-overlay" role="alert" aria-live="assertive">
      <div className="response-overlay__inner hud-frame">
        <span className="response-overlay__tag">AI</span>
        <p className="response-overlay__text">{lastResponse}</p>
      </div>
    </div>
  )
}
