/// <reference types="vite/client" />
const API_URL = import.meta.env.VITE_API_URL;

export type Product = {
  id: number
  name: string
  description: string | null
  price: number
  image_path: string
}

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/products`)
  if (!res.ok) throw new Error('Error al obtener productos')
  const json = await res.json()
  return json.data.map((p: any) => ({ ...p, price: parseFloat(p.price) }))
}

export const getProductById = async (id: number) => {
  const res = await fetch(`${API_URL}/products/${id}`)
  if (!res.ok) throw new Error('Error al obtener producto')
  return res.json()
}
