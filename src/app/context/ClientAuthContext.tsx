import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type ClientProfile = {
  id: string
  name: string
  email: string
  phoneNumber: string
  createdAt?: string
}

type ClientAuthContextValue = {
  isAuthenticated: boolean
  token: string | null
  client: ClientProfile | null
  login: (token: string, client: ClientProfile) => void
  logout: () => void
  setClient: (client: ClientProfile | null) => void
}

const ClientAuthContext = createContext<ClientAuthContextValue | null>(null)

export const ClientAuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('client_token'),
  )
  const [client, setClient] = useState<ClientProfile | null>(() => {
    const stored = localStorage.getItem('client_profile')
    return stored ? (JSON.parse(stored) as ClientProfile) : null
  })

  const isAuthenticated = !!token

  useEffect(() => {
    if (token) {
      localStorage.setItem('client_token', token)
    } else {
      localStorage.removeItem('client_token')
    }
  }, [token])

  useEffect(() => {
    if (client) {
      localStorage.setItem('client_profile', JSON.stringify(client))
    } else {
      localStorage.removeItem('client_profile')
    }
  }, [client])

  const login = (newToken: string, newClient: ClientProfile) => {
    setToken(newToken)
    setClient(newClient)
  }

  const logout = () => {
    setToken(null)
    setClient(null)
  }

  return (
    <ClientAuthContext.Provider
      value={{ isAuthenticated, token, client, login, logout, setClient }}
    >
      {children}
    </ClientAuthContext.Provider>
  )
}

export const useClientAuth = () => {
  const context = useContext(ClientAuthContext)
  if (!context) {
    throw new Error('useClientAuth must be used within a ClientAuthProvider')
  }
  return context
}
