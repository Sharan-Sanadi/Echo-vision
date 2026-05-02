import { Eye, Mic, Zap } from 'lucide-react';

const features = [
  {
    icon: <Eye size={28} />,
    title: "Real-time Vision",
    description: "Lightning-fast image processing analyzing your surroundings continuously at 3 FPS."
  },
  {
    icon: <Mic size={28} />,
    title: "AI Voice Assistance",
    description: "Ask questions naturally. The HUD understands your intent and speaks back instantly."
  },
  {
    icon: <Zap size={28} />,
    title: "Low Latency",
    description: "Optimized WebSocket connections ensure seamless and immediate feedback."
  }
];

export default function FeatureCards() {
  return (
    <div className="feature-container" role="list" aria-label="Key Features">
      {features.map((feature, idx) => (
        <div className="feature-card" key={idx} role="listitem">
          <div className="feature-icon-wrapper" aria-hidden="true">
            {feature.icon}
          </div>
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-desc">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
