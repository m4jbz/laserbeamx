import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { getClientProfile } from '../../api/clients'

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

  const login = useCallback((newToken: string, newClient: ClientProfile) => {
    setToken(newToken)
    setClient(newClient)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setClient(null)
  }, [])

  useEffect(() => {
    if (!token) return
    let cancelled = false

    getClientProfile(token)
      .then((response) => {
        if (cancelled) return
        const profile = response.data ?? response
        setClient(profile)
      })
      .catch((err) => {
        if (cancelled) return
        const status = (err as { status?: number }).status
        if (status === 401) {
          logout()
        }
      })

    return () => {
      cancelled = true
    }
  }, [token, logout])

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
