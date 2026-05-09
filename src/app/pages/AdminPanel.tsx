import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Pencil, Trash2, Package, FileText, LogOut, RefreshCw, Home } from 'lucide-react'

import { getProducts, deleteProduct, type Product } from '../../api/products'
import {
  getOrders,
  updateOrder,
  type Order,
  OrderStatus,
  orderStatusLabels,
  orderStatusColors,
  paymentStatusLabels,
  paymentStatusColors,
  paymentMethodLabels,
  deliveryTypeLabels,
  PaymentStatus,
} from '../../api/orders'
import { useAuth } from '../context/AuthContext'
import { ProductFormModal } from '../components/ProductFormModal'
import { DeleteProductDialog } from '../components/DeleteProductDialog'
import { Button } from '../components/ui/button'

export default function AdminPanel() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [activeTab, setActiveTab] = useState<'productos' | 'pedidos'>('productos')

  // Estados para modales de productos
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Query de productos
  const { data: products, isLoading: loadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  // Query de pedidos
  const { data: orders, isLoading: loadingOrders, refetch: refetchOrders } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  })

  // Mutations
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      setDeleteDialogOpen(false)
      setSelectedProduct(null)
    },
  })

  const updateOrderMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updateOrder>[1] }) =>
      updateOrder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })

  // Handlers productos
  const handleNewProduct = () => {
    setSelectedProduct(null)
    setFormModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setFormModalOpen(true)
  }

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      deleteProductMutation.mutate(selectedProduct.id)
    }
  }

  // Handler para cambiar estado de orden
  const handleOrderStatusChange = (order: Order, newStatus: OrderStatus) => {
    updateOrderMutation.mutate({
      id: order.id,
      data: { orderStatus: newStatus },
    })
  }

  const handlePaymentStatusChange = (order: Order, newStatus: PaymentStatus) => {
    updateOrderMutation.mutate({
      id: order.id,
      data: { paymentStatus: newStatus },
    })
  }

  return (
    <div className="min-h-screen bg-[#0B0C14] text-white p-6 md:p-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Panel de Control</h1>
          <p className="text-gray-400">Administra tu inventario y revisa tus ventas</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="bg-[#ddd] border-gray-700 hover:bg-gray-800"
          >
            <Home className="h-4 w-4" />
            Inicio
          </Button>
          <Button
            onClick={logout}
            variant="outline"
            className="bg-[#dddddd] border-gray-700 hover:bg-gray-800"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-800 mb-8">
          <button
            onClick={() => setActiveTab('productos')}
            className={`pb-4 px-2 font-bold flex items-center gap-2 transition-colors ${
              activeTab === 'productos'
                ? 'border-b-2 border-rose-600 text-rose-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Package className="h-4 w-4" />
            Productos
            {products && (
              <span className="bg-gray-800 text-xs px-2 py-0.5 rounded-full">
                {products.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('pedidos')}
            className={`pb-4 px-2 font-bold flex items-center gap-2 transition-colors ${
              activeTab === 'pedidos'
                ? 'border-b-2 border-rose-600 text-rose-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <FileText className="h-4 w-4" />
            Pedidos
            {orders && orders.length > 0 && (
              <span className="bg-gray-800 text-xs px-2 py-0.5 rounded-full">
                {orders.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab: Productos */}
        {activeTab === 'productos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Lista de Inventario</h2>
              <Button
                onClick={handleNewProduct}
                className="bg-[#065F46] hover:bg-[#047857]"
              >
                <Plus className="h-4 w-4" />
                Nuevo Producto
              </Button>
            </div>

            {/* Lista de productos */}
            <div className="grid gap-4">
              {loadingProducts ? (
                <div className="text-center py-8 text-gray-400">
                  Cargando productos...
                </div>
              ) : products?.length === 0 ? (
                <div className="text-center py-12 bg-[#111827] rounded-2xl border border-gray-800">
                  <Package className="h-12 w-12 mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-400 mb-4">No hay productos aún</p>
                  <Button
                    onClick={handleNewProduct}
                    className="bg-[#065F46] hover:bg-[#047857]"
                  >
                    <Plus className="h-4 w-4" />
                    Crear primer producto
                  </Button>
                </div>
              ) : (
                products?.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-[#111827] rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={product.imagePath}
                        className="w-16 h-16 object-cover rounded-xl bg-gray-800"
                        alt={product.name}
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src =
                            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect fill="%23374151" width="64" height="64"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239CA3AF" font-size="10">Sin img</text></svg>'
                        }}
                      />
                      <div>
                        <p className="font-bold text-lg">{product.name}</p>
                        <p className="text-green-500 font-bold">
                          ${product.price.toFixed(2)} MXN
                        </p>
                        {product.description && (
                          <p className="text-gray-500 text-sm truncate max-w-md">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                        className="bg-[#dddddd] border-gray-700 hover:bg-gray-800"
                      >
                        <Pencil className="h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Borrar
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab: Pedidos */}
        {activeTab === 'pedidos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Historial de Pedidos</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchOrders()}
                disabled={loadingOrders}
                className="border-gray-700 hover:bg-gray-800"
              >
                <RefreshCw className={`h-4 w-4 ${loadingOrders ? 'animate-spin' : ''}`} />
                Actualizar
              </Button>
            </div>

            {loadingOrders ? (
              <div className="text-center py-8 text-gray-400">
                Cargando pedidos...
              </div>
            ) : !orders || orders.length === 0 ? (
              <div className="text-center py-12 bg-[#111827] rounded-2xl border border-gray-800">
                <FileText className="h-12 w-12 mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400">No hay pedidos registrados</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-[#111827]">
                <table className="w-full text-left">
                  <thead className="text-gray-400 text-sm border-b border-gray-800">
                    <tr>
                      <th className="p-4">Ticket</th>
                      <th className="p-4">Cliente</th>
                      <th className="p-4">Fecha</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Estado Pedido</th>
                      <th className="p-4">Pago</th>
                      <th className="p-4">Detalles</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-800/20">
                        <td className="p-4 font-mono text-sm font-bold text-blue-400">
                          {order.ticketNumber}
                        </td>
                        <td className="p-4">
                          <p className="font-bold">{order.clientName}</p>
                          <p className="text-xs text-gray-500">{order.phoneNumber}</p>
                        </td>
                        <td className="p-4 text-sm text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString('es-MX', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="p-4 text-green-500 font-bold">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="p-4">
                          <select
                            value={order.orderStatus}
                            onChange={(e) =>
                              handleOrderStatusChange(order, e.target.value as OrderStatus)
                            }
                            disabled={updateOrderMutation.isPending}
                            className={`bg-gray-800 border border-gray-700 rounded px-2 py-1 font-bold text-xs outline-none cursor-pointer ${orderStatusColors[order.orderStatus]}`}
                          >
                            {Object.entries(orderStatusLabels).map(([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            <select
                              value={order.paymentStatus}
                              onChange={(e) =>
                                handlePaymentStatusChange(order, e.target.value as PaymentStatus)
                              }
                              disabled={updateOrderMutation.isPending}
                              className={`bg-gray-800 border border-gray-700 rounded px-2 py-1 font-bold text-xs outline-none cursor-pointer ${paymentStatusColors[order.paymentStatus]}`}
                            >
                              {Object.entries(paymentStatusLabels).map(([value, label]) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              ))}
                            </select>
                            <span className="text-xs text-gray-500">
                              {paymentMethodLabels[order.paymentMethod]}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-xs text-gray-400">
                          <p>
                            <span className="text-gray-500">Entrega:</span>{' '}
                            {deliveryTypeLabels[order.deliveryType]}
                          </p>
                          {order.deliveryAddress && (
                            <p className="truncate max-w-[150px]" title={order.deliveryAddress}>
                              <span className="text-gray-500">Dir:</span> {order.deliveryAddress}
                            </p>
                          )}
                          {order.notes && (
                            <p className="truncate max-w-[150px] text-yellow-500" title={order.notes}>
                              <span className="text-gray-500">Notas:</span> {order.notes}
                            </p>
                          )}
                          {order.orderDetail && (
                            <p className="font-bold mt-1">
                              Items: {order.orderDetail.length}
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modales */}
      <ProductFormModal
        open={formModalOpen}
        onOpenChange={setFormModalOpen}
        product={selectedProduct}
      />

      <DeleteProductDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        product={selectedProduct}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteProductMutation.isPending}
      />
    </div>
  )
}
