/**
 * useCamera — Phase 3 & 4
 *
 * Attaches getUserMedia() stream to a <video> element.
 * Frame capture added in Phase 4.
 */

import { useEffect, useRef } from 'react'
import { captureFrame } from '../utils/frameEncoder'

const CAPTURE_INTERVAL_MS = 350
const JPEG_QUALITY = 0.72

export function useCamera(videoRef, canvasRef, onFrame) {
  const intervalRef = useRef(null)

  useEffect(() => {
    let activeStream = null

    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        })
        activeStream = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }

        if (onFrame) {
          intervalRef.current = setInterval(() => {
            const frameData = captureFrame(videoRef.current, canvasRef.current, JPEG_QUALITY)
            if (frameData) onFrame(frameData)
          }, CAPTURE_INTERVAL_MS)
        }
      } catch (err) {
        console.error('[useCamera] Error accessing camera:', err)
      }
    }

    setupCamera()

    return () => {
      clearInterval(intervalRef.current)
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [videoRef, canvasRef, onFrame])
}
