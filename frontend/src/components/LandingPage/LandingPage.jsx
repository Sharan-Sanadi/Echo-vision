import { useState, useEffect, useRef } from 'react';
import BackgroundAnimation from './BackgroundAnimation';
import HeroSection from './HeroSection';
import FeatureCards from './FeatureCards';
import './LandingPage.css';

export default function LandingPage({ onStart }) {
  const [isExiting, setIsExiting] = useState(false);
  
  const keysRef = useRef([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      keysRef.current = [...keysRef.current, e.key].slice(-4);
      if (keysRef.current.join('').toLowerCase() === 'echo') {
        // Trigger easter egg
        document.documentElement.style.setProperty('--accent', '#ff00ff');
        const root = document.querySelector('.landing-page');
        if (root) {
          root.style.filter = 'hue-rotate(90deg)';
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLaunch = () => {
    setIsExiting(true);
    

    setTimeout(() => {
      onStart();
    }, 800); // Matches the 0.8s CSS transition
  };

  return (
    <main className={`landing-page ${isExiting ? 'fade-out' : ''}`}>
      <BackgroundAnimation />
      
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="landing-logo">
          Vision<span>Aid</span>
        </div>
      </nav>

      <div className="landing-content">
        <HeroSection onLaunch={handleLaunch} />
        <FeatureCards />
      </div>
    </main>
  );
}
