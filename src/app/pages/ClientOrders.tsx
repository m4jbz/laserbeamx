import { useEffect, useMemo, useState } from 'react'
import { useClientAuth } from '../context/ClientAuthContext'
import { getClientOrders } from '../../api/clients'
import { FileText, RefreshCw } from 'lucide-react'

type ClientOrder = {
  id: string
  ticketNumber: string
  total: string | number
  createdAt: string
  paymentStatus: string
  orderStatus: string
  deliveryType: string
}

export default function ClientOrders() {
  const { token, isAuthenticated, logout } = useClientAuth()
  const [orders, setOrders] = useState<ClientOrder[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const normalizedOrders = useMemo(() => {
    return orders.map((order) => ({
      ...order,
      total: typeof order.total === 'string' ? parseFloat(order.total) : order.total,
    }))
  }, [orders])

  const loadOrders = async () => {
    if (!token) return
    setLoading(true)
    setError(null)

    try {
      const response = await getClientOrders(token)
      setOrders(response.data || [])
    } catch (err) {
      const status = (err as { status?: number }).status
      if (status === 401) {
        logout()
        return
      }
      setError(err instanceof Error ? err.message : 'Error al cargar pedidos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders()
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0B0C14] text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Tu historial</h1>
            <p className="text-gray-400">Consulta tus pedidos recientes</p>
          </div>
          <button
            onClick={loadOrders}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-12">Cargando pedidos...</div>
        ) : error ? (
          <div className="text-center text-red-400 py-12">{error}</div>
        ) : normalizedOrders.length === 0 ? (
          <div className="text-center py-12 bg-[#111827] rounded-2xl border border-gray-800">
            <FileText className="h-12 w-12 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">Aún no tienes pedidos registrados</p>
          </div>
        ) : (
          <div className="space-y-4">
            {normalizedOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#111827] rounded-2xl border border-gray-800 p-4"
              >
                <div>
                  <p className="text-sm text-gray-400">Ticket</p>
                  <p className="text-lg font-semibold text-rose-400">{order.ticketNumber}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('es-MX', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className="flex flex-col text-sm text-gray-300">
                  <span>Estado pedido: {order.orderStatus}</span>
                  <span>Pago: {order.paymentStatus}</span>
                  <span>Entrega: {order.deliveryType}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="text-lg font-bold text-green-400">
                    ${Number(order.total).toFixed(2)} MXN
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
