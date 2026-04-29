/**
 * useTTS — Phase 5
 *
 * Wraps the Web Speech API (SpeechSynthesis).
 * - speak(text): cancels current speech, speaks new text immediately
 * - Picks a clear, natural-sounding voice if available
 *
 * TODO (Phase 5): Implement full logic below.
 */

import { useCallback, useRef } from 'react'

export function useTTS() {
  const synthRef = useRef(window.speechSynthesis)

  const speak = useCallback((text) => {
    // Phase 5: cancel + speak
    console.log('[useTTS] stub — implement in Phase 5:', text)
  }, [])

  return { speak }
}
