import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [wsStatus, setWsStatus] = useState('disconnected') // 'connected' | 'connecting' | 'disconnected'
  const [lastResponse, setLastResponse] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  return (
    <AppContext.Provider value={{
      wsStatus, setWsStatus,
      lastResponse, setLastResponse,
      isStreaming, setIsStreaming,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
