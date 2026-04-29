/**
 * useCamera — Phase 2
 *
 * Attaches getUserMedia() stream to a <video> element,
 * then runs a frame-capture loop using a hidden <canvas>.
 * Calls onFrame(base64jpeg) at the configured interval.
 *
 * TODO (Phase 2): Implement full logic below.
 */

import { useEffect, useRef } from 'react'

const CAPTURE_INTERVAL_MS = 350   // ~2.8 fps — tweak as needed
const JPEG_QUALITY        = 0.72  // 0–1, lower = smaller payload

export function useCamera(videoRef, canvasRef, onFrame) {
  const intervalRef = useRef(null)

  useEffect(() => {
    // Phase 2: call getUserMedia, attach stream, start interval
    console.log('[useCamera] stub — implement in Phase 2')
    return () => clearInterval(intervalRef.current)
  }, [onFrame])
}
