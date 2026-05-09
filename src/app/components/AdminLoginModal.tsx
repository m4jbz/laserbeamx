import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API_URL = import.meta.env.VITE_API_URL

export default function AdminLoginModal({ onClose }: { onClose: () => void }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: user, password: pass }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Credenciales incorrectas')
      }

      const data = await res.json()
      login(data.accessToken)
      onClose()
      window.location.href = '/admin'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesion')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[999]">
      <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-lg border border-rose-800 w-full max-w-sm">
        <h2 className="text-white text-2xl mb-6 font-bold text-center">Panel Administrativo</h2>
        <input
          type="text"
          placeholder="Usuario"
          className="w-full p-3 mb-4 bg-gray-800 text-white rounded border border-gray-700"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-3 mb-4 bg-gray-800 text-white rounded border border-gray-700"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
        />
        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}
        <button
          disabled={isSubmitting}
          className="w-full bg-rose-800 text-white py-3 rounded-lg font-bold hover:bg-rose-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Validando...' : 'Entrar'}
        </button>
        <button type="button" onClick={onClose} className="w-full text-gray-500 mt-4 text-sm">Cerrar</button>
      </form>
    </div>
  )
}
