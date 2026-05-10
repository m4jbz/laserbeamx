/// <reference types="vite/client" />
const API_URL = import.meta.env.VITE_API_URL

export type Product = {
  id: string // UUID from backend
  name: string
  description: string | null
  price: number
  imagePath: string
  createdAt: string
}

export type CreateProductDto = {
  name: string
  description?: string
  price: number
  imagePath: string
}

export type UpdateProductDto = Partial<CreateProductDto>

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/products`)
  if (!res.ok) throw new Error('Error al obtener productos')
  const json = await res.json()
  const products = json.data.map((p: any) => ({ ...p, price: parseFloat(p.price) }))
  // Ordenar por nombre alfabéticamente
  return products.sort((a: Product, b: Product) => 
    a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
  )
}

export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${API_URL}/products/${id}`)
  if (!res.ok) throw new Error('Error al obtener producto')
  const json = await res.json()
  return { ...json.data, price: parseFloat(json.data.price) }
}

export const createProduct = async (
  data: CreateProductDto,
  token: string,
): Promise<Product> => {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || 'Error al crear producto')
  }
  const json = await res.json()
  return { ...json.data.product, price: parseFloat(json.data.product.price) }
}

export const updateProduct = async (
  id: string,
  data: UpdateProductDto,
  token: string,
): Promise<Product> => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || 'Error al actualizar producto')
  }
  const json = await res.json()
  return { ...json.data.updatedProduct, price: parseFloat(json.data.updatedProduct.price) }
}

export const deleteProduct = async (id: string, token: string): Promise<void> => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || 'Error al eliminar producto')
  }
}
