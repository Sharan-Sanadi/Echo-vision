/**
 * useTTS — Phase 6
 *
 * Wraps the Web Speech API (SpeechSynthesis).
 * - speak(text): cancels current speech, speaks new text immediately
 * - Picks a clear, natural-sounding voice if available
 */

import { useCallback, useRef } from 'react'

export function useTTS() {
  const synthRef = useRef(window.speechSynthesis)

  const speak = useCallback((text) => {
    if (!synthRef.current || !text) return

    // Cancel any ongoing speech
    synthRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    
    // Try to find a good English voice
    const voices = synthRef.current.getVoices()
    const preferredVoice = voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural'))
    )
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    utterance.rate = 1.05 // Slightly faster than default
    synthRef.current.speak(utterance)
  }, [])

  return { speak }
}
