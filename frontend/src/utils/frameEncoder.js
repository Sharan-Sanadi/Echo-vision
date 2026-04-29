/**
 * frameEncoder.js — Phase 4
 *
 * Captures the current video frame from a <canvas>
 * and returns a compressed base64 JPEG string.
 *
 * Usage:
 *   const base64 = captureFrame(videoEl, canvasEl, quality)
 */

/**
 * @param {HTMLVideoElement} video
 * @param {HTMLCanvasElement} canvas
 * @param {number} quality  0–1 JPEG quality (default 0.72)
 * @returns {string|null}   base64 data URL, or null if not ready
 */
export function captureFrame(video, canvas, quality = 0.72) {
  if (!video || video.readyState < 2) return null

  const w = video.videoWidth
  const h = video.videoHeight
  if (!w || !h) return null

  canvas.width  = w
  canvas.height = h

  const ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0, w, h)

  // toDataURL includes "data:image/jpeg;base64," prefix — strip it
  const dataUrl = canvas.toDataURL('image/jpeg', quality)
  return dataUrl.split(',')[1] ?? null
}
