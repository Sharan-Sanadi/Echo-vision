import { useEffect, useState } from 'react';

const taglines = [
  "See Smarter.",
  "Hear Faster.",
  "React Better.",
  "Navigate Freely."
];

export default function HeroSection({ onLaunch }) {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section">
      <h2 className="hero-greeting">Welcome back, Visionary!</h2>
      <h1 className="hero-title">
        Empower Your Senses with <span>VisionAid</span>
      </h1>
      <p className="hero-tagline" aria-live="polite">
        {taglines[taglineIndex]}
      </p>
      
      <button 
        className="launch-button" 
        onClick={onLaunch}
        aria-label="Launch VisionAid Application"
      >
        Start VisionAid
      </button>
    </div>
  );
}
