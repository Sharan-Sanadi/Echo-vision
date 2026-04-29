/**
 * useWebSocket — Phase 2 & 3
 *
 * Manages a persistent WebSocket connection to the backend.
 * Features:
 *  - Stores socket in useRef (no re-init on re-render)
 *  - Exponential backoff on disconnect
 *  - Calls onMessage(data) for every incoming JSON message
 *  - Updates wsStatus in AppContext
 */

import { useRef, useEffect, useCallback } from 'react'
import { useApp } from '../context/AppContext'
import { getBackoffDelay } from '../utils/backoff'

const WS_URL = import.meta.env.VITE_WS_URL ?? 'ws://localhost:8000/ws'

export function useWebSocket(onMessage) {
  const { setWsStatus } = useApp()
  const wsRef = useRef(null)
  const attemptRef = useRef(0)
  const mountedRef = useRef(true)

  const connect = useCallback(() => {
    if (!mountedRef.current) return
    
    setWsStatus('connecting')
    const ws = new WebSocket(WS_URL)
    wsRef.current = ws

    ws.onopen = () => {
      if (!mountedRef.current) {
        ws.close()
        return
      }
      setWsStatus('connected')
      attemptRef.current = 0
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (onMessage) onMessage(data)
      } catch (err) {
        console.error('[WebSocket] Failed to parse message', err)
      }
    }

    ws.onclose = () => {
      if (!mountedRef.current) return
      setWsStatus('disconnected')
      wsRef.current = null

      const delay = getBackoffDelay(attemptRef.current)
      attemptRef.current += 1
      setTimeout(() => {
        if (mountedRef.current) connect()
      }, delay)
    }

    ws.onerror = (err) => {
      console.error('[WebSocket] Error', err)
      // The onclose handler will take care of reconnection
    }
  }, [onMessage, setWsStatus])

  useEffect(() => {
    mountedRef.current = true
    connect()
    return () => {
      mountedRef.current = false
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
    }
  }, [connect])

  const send = useCallback((payload) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload))
    } else {
      console.warn('[WebSocket] Cannot send, socket not open.')
    }
  }, [])

  return { send, wsRef }
}
