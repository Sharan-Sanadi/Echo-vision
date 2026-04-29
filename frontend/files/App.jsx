import { useRef, useState, useEffect } from 'react'
import { AppProvider } from './context/AppContext'
import CameraFeed from './components/Camera/CameraFeed'
import ConnectionStatus from './components/StatusBar/ConnectionStatus'
import ResponseOverlay from './components/Overlay/ResponseOverlay'
import VoiceQuery from './components/VoiceQuery/VoiceQuery'
import './App.css'

// ─── Timestamp ticker ─────────────────────────────────────
function Timestamp() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="app-timestamp">{time}</span>
}

// ─── Main App ─────────────────────────────────────────────
function AppInner() {
  const videoRef  = useRef(null)   // Phase 2: camera stream target
  const canvasRef = useRef(null)   // Phase 2: frame capture surface
  const wsRef     = useRef(null)   // Phase 3: WebSocket instance
  const [isStreaming, setIsStreaming] = useState(false)

  /**
   * Phase 3 will replace this stub with useWebSocket().
   * Phase 6 will wire VoiceQuery → sendQuery(text).
   */
  function handleQuerySubmit(query) {
    console.log('[VoiceQuery] stub — will send via WS in Phase 6:', query)
  }

  return (
    <div className="app" role="main">

      {/* ── Fullscreen Camera ── */}
      <CameraFeed videoRef={videoRef} canvasRef={canvasRef} />

      {/* ── HUD Header ── */}
      <header className="app-hud-header">
        <div className="app-logo">
          Vision<span>Aid</span>
        </div>

        {/* Center: query input */}
        <VoiceQuery onSubmit={handleQuerySubmit} />

        {/* Right: status cluster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Timestamp />
          <div className={`app-stream-indicator ${isStreaming ? '' : 'app-stream-indicator--idle'}`}>
            <span className="app-stream-indicator__dot" aria-hidden="true" />
            {isStreaming ? 'STREAMING' : 'IDLE'}
          </div>
          <ConnectionStatus />
        </div>
      </header>

      {/* ── AI Response Subtitle ── */}
      <ResponseOverlay />

    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
