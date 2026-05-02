import { useState } from 'react';
import { Mic, Keyboard, X } from 'lucide-react';
import { useSpeechToText } from '../../hooks/useSpeechToText';
import './VoiceQuery.css';

export default function VoiceQuery({ onSubmit }) {
  const [textInputVisible, setTextInputVisible] = useState(false);
  const [textQuery, setTextQuery] = useState('');
  
  const {
    isSupported,
    isListening,
    transcript,
    error,
    startListening,
    stopListening
  } = useSpeechToText(onSubmit);

  // Fallback text submission
  function handleKeyDown(e) {
    if (e.key === 'Enter' && textQuery.trim()) {
      onSubmit?.(textQuery.trim());
      setTextQuery('');
      setTextInputVisible(false);
    }
    if (e.key === 'Escape') {
      setTextInputVisible(false);
      setTextQuery('');
    }
  }

  // Toggle speech recognition
  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      setTextInputVisible(false);
    }
  };

  // If manual text input is toggled on, show standard input
  if (textInputVisible || !isSupported) {
    return (
      <div className="voice-query voice-query--open">
        <div className="voice-query__input-wrap hud-frame">
          <span className="voice-query__prompt" aria-hidden="true">&gt;_</span>
          <input
            className="voice-query__input"
            type="text"
            value={textQuery}
            onChange={e => setTextQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={!isSupported ? "Voice not supported. Type here..." : "Type your query..."}
            autoFocus
            aria-label="Text query input — press Enter to send"
          />
          {isSupported && (
            <button className="voice-query__close" onClick={() => setTextInputVisible(false)}>
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`voice-query ${isListening ? 'listening' : ''}`}>
      {/* Transcript Overlay */}
      {isListening && (
        <div className="voice-query__transcript">
          {transcript || "Listening..."}
        </div>
      )}

      {/* Error Message */}
      {error && <div className="voice-query__error">{error}</div>}

      {/* Microphone Button */}
      <div className="voice-query__controls">
        <button
          className={`mic-button ${isListening ? 'active' : ''}`}
          onMouseDown={handleMicClick}
          aria-label={isListening ? "Stop listening" : "Start voice query"}
        >
          <Mic size={32} />
          {isListening && <div className="pulse-ring"></div>}
        </button>

        {/* Fallback to keyboard icon */}
        {!isListening && (
          <button 
            className="keyboard-button" 
            onClick={() => setTextInputVisible(true)}
            aria-label="Switch to keyboard input"
          >
            <Keyboard size={26} />
          </button>
        )}
      </div>
    </div>
  );
}
