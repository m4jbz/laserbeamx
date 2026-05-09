import React, { createContext, useContext, useState, ReactNode } from 'react'

type AuthContextValue = {
  isAuthenticated: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('admin_token'),
  )
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('admin_token'),
  )
  
  const login = (token: string) => {
    localStorage.setItem('admin_token', token)
    setToken(token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    setToken(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
