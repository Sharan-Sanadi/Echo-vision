/**
 * useCamera — Phase 3
 *
 * Attaches getUserMedia() stream to a <video> element.
 * Frame capture will be added in Phase 4.
 */

import { useEffect } from 'react'

export function useCamera(videoRef) {
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
      } catch (err) {
        console.error('[useCamera] Error accessing camera:', err)
      }
    }

    setupCamera()

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [videoRef])
}
