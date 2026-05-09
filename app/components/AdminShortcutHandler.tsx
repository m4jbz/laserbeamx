import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import AdminLoginModal from './AdminLoginModal'

/**
 * Componente que maneja el shortcut Ctrl+Y para acceder al panel admin.
 * - Si está autenticado: navega directamente a /admin
 * - Si no está autenticado: muestra el modal de login
 * 
 * Debe renderizarse dentro del contexto del Router.
 */
export function AdminShortcutHandler() {
  const [showLogin, setShowLogin] = useState(false)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Y para abrir admin
      if (e.ctrlKey && e.key.toLowerCase() === 'y') {
        e.preventDefault()
        
        if (isAuthenticated) {
          navigate('/admin')
        } else {
          setShowLogin(true)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isAuthenticated, navigate])

  const handleLoginClose = () => {
    setShowLogin(false)
  }

  if (!showLogin) return null

  return <AdminLoginModal onClose={handleLoginClose} />
}
