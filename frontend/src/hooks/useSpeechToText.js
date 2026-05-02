import { useState, useEffect, useRef, useCallback } from 'react';

export function useSpeechToText(onComplete) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const [isSupported] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    }
    return false;
  });

  const recognitionRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  // Keep callback fresh without triggering reconnects
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (typeof window === 'undefined' || !isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error('[SpeechRecognition] Error:', event.error);
      if (event.error === 'not-allowed') {
        setError('Microphone access denied.');
      } else {
        setError('Error recognizing speech.');
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      
      // When it stops listening, if we have a transcript, submit it
      setTranscript((currentTranscript) => {
        const trimmed = currentTranscript.trim();
        if (trimmed && onCompleteRef.current) {
          onCompleteRef.current(trimmed);
        }
        return ''; // Reset transcript for next time
      });
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setError('');
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('[SpeechRecognition] Failed to start:', err);
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  return {
    isSupported,
    isListening,
    transcript,
    error,
    startListening,
    stopListening
  };
}
