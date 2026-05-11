/// <reference types="vite/client" />
const API_URL = import.meta.env.VITE_API_URL

type ApiError = Error & { status?: number }

const getErrorMessage = (json: any, fallback: string) => {
  if (json?.message) {
    return Array.isArray(json.message) ? json.message.join(', ') : json.message
  }
  return fallback
}

const toError = (res: Response, json: any, fallback: string): ApiError => {
  const error = new Error(getErrorMessage(json, fallback)) as ApiError
  error.status = res.status
  return error
}
export type ClientProfile = {
  id: string
  name: string
  email: string
  phoneNumber: string
  createdAt?: string
}

export type RegisterClientDto = {
  name: string
  email: string
  password: string
  phoneNumber: string
}

export type LoginClientDto = {
  email: string
  password: string
}

export const registerClient = async (data: RegisterClientDto) => {
  const res = await fetch(`${API_URL}/clients/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw toError(res, json, 'Error al crear cuenta')
  }
  return json
}

export const loginClient = async (data: LoginClientDto) => {
  const res = await fetch(`${API_URL}/clients/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw toError(res, json, 'Credenciales incorrectas')
  }
  return json
}

export const getClientProfile = async (token: string) => {
  const res = await fetch(`${API_URL}/clients/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw toError(res, json, 'Error al obtener perfil')
  }
  return json
}

export const getClientOrders = async (token: string) => {
  const res = await fetch(`${API_URL}/clients/me/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw toError(res, json, 'Error al obtener pedidos')
  }
  return json
}
