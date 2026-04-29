/**
 * useWebSocket — Phase 3
 *
 * Manages a persistent WebSocket connection to the backend.
 * Features:
 *  - Stores socket in useRef (no re-init on re-render)
 *  - Exponential backoff on disconnect
 *  - Calls onMessage(data) for every incoming JSON message
 *  - Updates wsStatus in AppContext
 *
 * TODO (Phase 3): Implement full logic below.
 */

import { useRef, useEffect, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import { getBackoffDelay } from '../utils/backoff'

const WS_URL = import.meta.env.VITE_WS_URL ?? 'ws://localhost:8000/ws'

export function useWebSocket(onMessage) {
  const { setWsStatus } = useApp()
  const wsRef     = useRef(null)
  const attemptRef = useRef(0)
  const mountedRef = useRef(true)

  const connect = useCallback(() => {
    // Phase 3: implement connection + backoff
    console.log('[useWebSocket] stub — implement in Phase 3')
  }, [onMessage, setWsStatus])

  useEffect(() => {
    mountedRef.current = true
    connect()
    return () => {
      mountedRef.current = false
      wsRef.current?.close()
    }
  }, [connect])

  const send = useCallback((payload) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload))
    }
  }, [])

  return { send, wsRef }
}
