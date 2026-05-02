import { useRef, useState, useEffect, useCallback } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import { useWebSocket } from './hooks/useWebSocket'
import { useCamera } from './hooks/useCamera'
import { useTTS } from './hooks/useTTS'
import CameraFeed from './components/Camera/CameraFeed'
import ConnectionStatus from './components/StatusBar/ConnectionStatus'
import ResponseOverlay from './components/Overlay/ResponseOverlay'
import VoiceQuery from './components/VoiceQuery/VoiceQuery'
import LandingPage from './components/LandingPage/LandingPage'
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
  const [isStreaming, setIsStreaming] = useState(false)

  const { speak } = useTTS()
  const { setLastResponse } = useApp()

  // Phase 2: Dummy connection test using the hook
  const { send } = useWebSocket((data) => {
    console.log('[App] Received from WS:', data)
    if (data.text) {
      setLastResponse(data.text)
      speak(data.text) // Phase 6: Speak the response
    }
  })

  // Phase 3 & 4: Start camera and encode frames
  const handleFrame = useCallback((frameData) => {
    setIsStreaming(true)
    send({ type: 'image', data: frameData })
  }, [send])

  // Phase 3 & 4: Start camera and encode frames
  useCamera(videoRef, canvasRef, handleFrame)

  /**
   * Phase 3 will replace this stub with useWebSocket().
   * Phase 6 will wire VoiceQuery → sendQuery(text).
   */
  function handleQuerySubmit(query) {
    console.log('[VoiceQuery] Sending via WS:', query)
    send({ type: 'query', text: query })
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
  const [isAppStarted, setIsAppStarted] = useState(false)

  return (
    <AppProvider>
      {isAppStarted ? (
        <AppInner />
      ) : (
        <LandingPage onStart={() => setIsAppStarted(true)} />
      )}
    </AppProvider>
  )
}
