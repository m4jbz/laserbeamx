import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts } from '../../api/products';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';

export default function AdminPanel() {
  const queryClient = useQueryClient();
  const { logout } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const [activeTab, setActiveTab] = useState<'productos' | 'pedidos'>('productos');

  const { data: products, isLoading: loadingProducts } = useQuery({ 
    queryKey: ['products'], 
    queryFn: getProducts 
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: number) => {
      console.log('Borrando:', id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  return (
    <div className="min-h-screen bg-[#0B0C14] text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Panel de Control</h1>
          <p className="text-gray-400">Administra tu inventario y revisa tus ventas</p>
        </div>
        <button 
          onClick={logout} 
          className="bg-[#065F46] hover:bg-[#047857] text-white px-6 py-2 rounded-xl font-bold transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex gap-8 border-b border-gray-800 mb-8">
          <button 
            onClick={() => setActiveTab('productos')}
            className={`pb-4 px-2 font-bold flex items-center gap-2 transition-colors ${activeTab === 'productos' ? 'border-b-2 border-rose-600 text-rose-500' : 'text-gray-400'}`}
          >
            📦 Productos
          </button>
          <button 
            onClick={() => setActiveTab('pedidos')}
            className={`pb-4 px-2 font-bold flex items-center gap-2 transition-colors ${activeTab === 'pedidos' ? 'border-b-2 border-rose-600 text-rose-500' : 'text-gray-400'}`}
          >
            📄 Pedidos
          </button>
        </div>

        {activeTab === 'productos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Lista de Inventario</h2>
              <button className="bg-[#065F46] hover:bg-[#047857] px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                + Nuevo Producto
              </button>
            </div>

            <div className="grid gap-4">
              {loadingProducts ? <p>Cargando...</p> : products?.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between p-4 bg-[#111827] rounded-2xl border border-gray-800">
                  <div className="flex items-center gap-4">
                    <img src={p.imagePath} className="w-16 h-16 object-cover rounded-xl" alt={p.name} />
                    <div>
                      <p className="font-bold text-lg">{p.name}</p>
                      <p className="text-green-500 font-bold">${p.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="bg-white text-black px-6 py-2 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                      Editar
                    </button>
                    <button 
                      onClick={() => deleteProduct.mutate(p.id)}
                      className="bg-[#991B1B] text-white px-6 py-2 rounded-xl font-bold hover:bg-red-800 transition-colors"
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pedidos' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Historial de Pedidos</h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-[#111827]">
              <table className="w-full text-left">
                <thead className="text-gray-400 text-sm border-b border-gray-800">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Cliente</th>
                    <th className="p-4">Fecha</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4">Detalles</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-800/20">
                      <td className="p-4 font-mono text-xs text-gray-500">{order.id}</td>
                      <td className="p-4 font-bold">{order.customerName}</td>
                      <td className="p-4 text-sm">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="p-4 text-green-500 font-bold">${order.total.toFixed(2)}</td>
                      <td className="p-4">
                        <select
                          value={order.estado}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className={`bg-transparent border-none font-bold text-xs outline-none ${
                            order.estado === 'Enviado' ? 'text-green-400' : 
                            order.estado === 'Cancelado' ? 'text-red-400' : 'text-yellow-400'
                          }`}
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="Enviado">Enviado</option>
                          <option value="Cancelado">Cancelado</option>
                        </select>
                      </td>
                      <td className="p-4 text-xs text-gray-400">
                        <p>Tel: {order.phoneNumber}</p>
                        <p>Entrega: {order.deliveryType}</p>
                        <p className="font-bold mt-1">Items: {order.cartItems.length}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
