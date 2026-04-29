import './CameraFeed.css'

/**
 * Phase 1: Renders the shell / placeholder.
 * Phase 2: Will wire in useCamera() hook, attach stream to <video>,
 *           and start the frame-capture loop on a hidden <canvas>.
 */
export default function CameraFeed({ videoRef, canvasRef }) {
  return (
    <div className="camera-shell">
      {/* Live camera stream — ref provided by parent (App) */}
      <video
        ref={videoRef}
        className="camera-video"
        autoPlay
        playsInline
        muted
        aria-label="Live camera feed"
      />

      {/* Hidden canvas used to grab frames — never shown */}
      <canvas ref={canvasRef} className="camera-canvas" aria-hidden="true" />

      {/* Corner HUD brackets */}
      <div className="camera-bracket camera-bracket--tl" aria-hidden="true" />
      <div className="camera-bracket camera-bracket--tr" aria-hidden="true" />
      <div className="camera-bracket camera-bracket--bl" aria-hidden="true" />
      <div className="camera-bracket camera-bracket--br" aria-hidden="true" />

      {/* Center reticle */}
      <div className="camera-reticle" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}
