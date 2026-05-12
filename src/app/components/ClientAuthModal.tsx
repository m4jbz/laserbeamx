import { useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { loginClient, registerClient } from '../../api/clients'
import { useClientAuth } from '../context/ClientAuthContext'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const initialRegister = {
  name: '',
  email: '',
  password: '',
  phoneNumber: '',
}

export default function ClientAuthModal({ open, onOpenChange }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState(initialRegister)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, isAuthenticated, client, logout } = useClientAuth()

  const title = useMemo(() => {
    if (isAuthenticated) return 'Tu cuenta'
    return mode === 'login' ? 'Iniciar sesion' : 'Crear cuenta'
  }, [isAuthenticated, mode])

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await loginClient(loginData)
      login(response.data.access_token, response.data.client)
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesion')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!registerData.name.trim()) {
      setError('El nombre es requerido')
      return
    }
    if (!registerData.email.trim()) {
      setError('El correo es requerido')
      return
    }
    if (!registerData.password.trim()) {
      setError('La contrasena es requerida')
      return
    }
    if (registerData.password.trim().length < 8) {
      setError('La contrasena debe tener minimo 8 caracteres')
      return
    }
    if (registerData.phoneNumber.length !== 10) {
      setError('El telefono debe tener 10 digitos')
      return
    }

    setIsSubmitting(true)

    try {
      await registerClient({
        ...registerData,
        phoneNumber: `+52${registerData.phoneNumber}`,
      })
      const response = await loginClient({
        email: registerData.email,
        password: registerData.password,
      })
      login(response.data.access_token, response.data.client)
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear cuenta')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePhoneChange = (value: string) => {
    const onlyDigits = value.replace(/\D/g, '').slice(0, 10)
    setRegisterData((prev) => ({ ...prev, phoneNumber: onlyDigits }))
  }

  const handleClose = () => {
    setError(null)
    setIsSubmitting(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-[#0E1118] border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">{title}</DialogTitle>
        </DialogHeader>

        {isAuthenticated ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-800 bg-gray-900/40 p-4">
              <p className="text-sm text-gray-400">Bienvenido</p>
              <p className="text-lg font-semibold">{client?.name}</p>
              <p className="text-sm text-gray-400">{client?.email}</p>
              <p className="text-sm text-gray-400">{client?.phoneNumber}</p>
            </div>
            <button
              onClick={() => {
                logout()
                onOpenChange(false)
              }}
              className="w-full rounded-lg bg-rose-800 py-2 font-semibold hover:bg-rose-700"
            >
              Cerrar sesion
            </button>
          </div>
        ) : (
          <div>
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => {
                  setMode('login')
                  setError(null)
                }}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold ${
                  mode === 'login'
                    ? 'bg-rose-800 text-white'
                    : 'bg-gray-800 text-gray-300'
                }`}
              >
                Iniciar sesion
              </button>
              <button
                onClick={() => {
                  setMode('register')
                  setError(null)
                }}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold ${
                  mode === 'register'
                    ? 'bg-rose-800 text-white'
                    : 'bg-gray-800 text-gray-300'
                }`}
              >
                Crear cuenta
              </button>
            </div>

            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Correo"
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
                <input
                  type="password"
                  placeholder="Contrasena"
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
                {error && (
                  <p className="text-sm text-red-400 text-center">{error}</p>
                )}
                <button
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-rose-800 py-3 font-semibold hover:bg-rose-700 disabled:opacity-60"
                >
                  {isSubmitting ? 'Entrando...' : 'Entrar'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <input
                  type="email"
                  placeholder="Correo"
                  required
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
                <input
                  type="password"
                  placeholder="Contrasena (min 8)"
                  required
                  minLength={8}
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
                <input
                  type="tel"
                  placeholder="Telefono (10 digitos)"
                  required
                  minLength={10}
                  maxLength={10}
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
                  value={registerData.phoneNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                />
                {error && (
                  <p className="text-sm text-red-400 text-center">{error}</p>
                )}
                <button
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-rose-800 py-3 font-semibold hover:bg-rose-700 disabled:opacity-60"
                >
                  {isSubmitting ? 'Creando...' : 'Crear cuenta'}
                </button>
              </form>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
