/// <reference types="vite/client" />
const API_URL = import.meta.env.VITE_API_URL

// Enums que coinciden con el backend
export enum OrderStatus {
  CONFIRMED = 'CONFIRMED',
  DELIVERED = 'DELIVERED',
  ON_THE_WAY = 'ON_THE_WAY',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
}

export enum DeliveryType {
  HOME = 'HOME',
  PLACE = 'PLACE',
}

export enum PaymentStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
}

export enum PaymentMethod {
  CASH = 'CASH',
  TRANSFER = 'TRANSFER',
}

// Tipos
export type OrderDetail = {
  id: string
  quantity: number
  unitPrice: number
  subtotal: number
  productId: string
  product?: {
    id: string
    name: string
    imagePath: string
  }
}

export type Order = {
  id: string
  ticketNumber: string
  notes: string | null
  clientName: string
  phoneNumber: string
  total: number
  orderStatus: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod
  deliveryType: DeliveryType
  deliveryAddress: string | null
  createdAt: string
  updatedAt: string
  clientId: string | null
  orderDetail?: OrderDetail[]
}

export type CreateOrderDto = {
  notes?: string
  clientName: string
  phoneNumber: string
  orderStatus: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod
  deliveryType: DeliveryType
  clientId?: string
  details: Array<{
    id: string
    quantity: number
  }>
}

export type UpdateOrderDto = {
  notes?: string
  clientName?: string
  phoneNumber?: string
  orderStatus?: OrderStatus
  paymentStatus?: PaymentStatus
  paymentMethod?: PaymentMethod
  deliveryType?: DeliveryType
  clientId?: string
}

// Helpers para parsear decimals del backend
const parseOrder = (order: any): Order => ({
  ...order,
  total: parseFloat(order.total),
  orderDetail: order.orderDetail?.map((d: any) => ({
    ...d,
    unitPrice: parseFloat(d.unitPrice),
    subtotal: parseFloat(d.subtotal),
  })),
})

// API Functions
export const getOrders = async (token: string): Promise<Order[]> => {
  const res = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) throw new Error('Error al obtener pedidos')
  const json = await res.json()
  return json.data.map(parseOrder)
}

export const getOrderById = async (id: string): Promise<Order> => {
  const res = await fetch(`${API_URL}/orders/${id}`)
  if (!res.ok) throw new Error('Error al obtener pedido')
  const json = await res.json()
  return parseOrder(json.data)
}

export const createOrder = async (
  data: CreateOrderDto,
  token?: string | null,
): Promise<Order> => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || 'Error al crear pedido')
  }
  const json = await res.json()
  return parseOrder(json.data.order)
}

export const updateOrder = async (
  id: string,
  data: UpdateOrderDto,
  token: string,
): Promise<Order> => {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || 'Error al actualizar pedido')
  }
  const json = await res.json()
  return parseOrder(json.data.updatedOrder)
}

export const deleteOrder = async (id: string, token: string): Promise<void> => {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || 'Error al eliminar pedido')
  }
}

// Labels para mostrar en UI
export const orderStatusLabels: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'Pendiente',
  [OrderStatus.CONFIRMED]: 'Confirmado',
  [OrderStatus.ON_THE_WAY]: 'En camino',
  [OrderStatus.DELIVERED]: 'Entregado',
  [OrderStatus.CANCELLED]: 'Cancelado',
}

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: 'Pendiente',
  [PaymentStatus.PAID]: 'Pagado',
}

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  [PaymentMethod.CASH]: 'Efectivo',
  [PaymentMethod.TRANSFER]: 'Transferencia',
}

export const deliveryTypeLabels: Record<DeliveryType, string> = {
  [DeliveryType.HOME]: 'A domicilio',
  [DeliveryType.PLACE]: 'Recoger en local',
}

// Colores para estados
export const orderStatusColors: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'text-yellow-400',
  [OrderStatus.CONFIRMED]: 'text-blue-400',
  [OrderStatus.ON_THE_WAY]: 'text-purple-400',
  [OrderStatus.DELIVERED]: 'text-green-400',
  [OrderStatus.CANCELLED]: 'text-red-400',
}

export const paymentStatusColors: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: 'text-yellow-400',
  [PaymentStatus.PAID]: 'text-green-400',
}

// ----- WhatsApp helpers -----

const WHATSAPP_PHONE = import.meta.env.VITE_ADMIN_WHATSAPP

/**
 * Build a WhatsApp message with all order details (sin emojis).
 */
export function buildWhatsAppMessage(order: Order): string {
  const lines: string[] = [
    `*Nuevo pedido - LaserBeamX*`,
    ``,
    `*Ticket:* ${order.ticketNumber}`,
    `*Cliente:* ${order.clientName}`,
    `*Telefono:* ${order.phoneNumber}`,
    ``,
    `*Productos:*`,
  ]

  if (order.orderDetail) {
    for (const d of order.orderDetail) {
      const productName = d.product?.name || 'Producto'
      lines.push(`  - ${productName} x${d.quantity} - $${d.unitPrice.toLocaleString('es-MX')} c/u = $${d.subtotal.toLocaleString('es-MX')}`)
    }
  }

  lines.push(``)
  lines.push(`*Total:* $${order.total.toLocaleString('es-MX')} MXN`)
  lines.push(``)

  if (order.deliveryType === DeliveryType.HOME && order.notes) {
    lines.push(`*Entrega:* A domicilio`)
    // La direccion esta en las notas
    const addressMatch = order.notes.match(/Direccion: (.+?)(\n|$)/i)
    if (addressMatch) {
      lines.push(`*Direccion:* ${addressMatch[1]}`)
    }
  } else {
    lines.push(`*Entrega:* Recoger en local`)
  }

  lines.push(`*Metodo de pago:* ${paymentMethodLabels[order.paymentMethod]}`)

  // Extraer notas sin la direccion
  if (order.notes) {
    const cleanNotes = order.notes.replace(/Direccion: .+?(\n|$)/i, '').trim()
    if (cleanNotes) {
      lines.push(``)
      lines.push(`*Notas:* ${cleanNotes}`)
    }
  }

  return lines.join('\n')
}

/**
 * Get the full WhatsApp URL for an order.
 */
export function getWhatsAppUrl(order: Order): string {
  const message = buildWhatsAppMessage(order)
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
}
