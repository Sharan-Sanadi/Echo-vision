import { useApp } from '../../context/AppContext'
import './ConnectionStatus.css'

const STATUS_CONFIG = {
  connected:    { label: 'LIVE',         color: 'green' },
  connecting:   { label: 'CONNECTING…',  color: 'amber' },
  disconnected: { label: 'OFFLINE',      color: 'red'   },
}

export default function ConnectionStatus() {
  const { wsStatus } = useApp()
  const { label, color } = STATUS_CONFIG[wsStatus] ?? STATUS_CONFIG.disconnected

  return (
    <div className={`status-pill status-pill--${color}`} role="status" aria-live="polite">
      <span className="status-dot" aria-hidden="true" />
      <span className="status-label">{label}</span>
    </div>
  )
}
