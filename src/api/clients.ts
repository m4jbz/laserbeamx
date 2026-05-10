/// <reference types="vite/client" />
const API_URL = import.meta.env.VITE_API_URL

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
    throw new Error(json.message || 'Error al crear cuenta')
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
    throw new Error(json.message || 'Credenciales incorrectas')
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
    throw new Error(json.message || 'Error al obtener perfil')
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
    throw new Error(json.message || 'Error al obtener pedidos')
  }
  return json
}
