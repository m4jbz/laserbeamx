import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts } from '../../api/products';
import { useAuth } from '../context/AuthContext';

export default function AdminPanel() {
  const queryClient = useQueryClient();
  const { logout } = useAuth();
  const { data: products } = useQuery({ queryKey: ['products'], queryFn: getProducts });

  const deleteProduct = useMutation({
    mutationFn: async (id: number) => { /* Aquí iría la lógica de borrado real */ },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  return (
    <div className="min-h-screen bg-[#0B0C14] text-white p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <button onClick={logout} className="bg-red-700 px-6 py-2 rounded-lg font-bold">Cerrar Sesión</button>
      </div>

      <div className="grid gap-4 max-w-4xl mx-auto">
        {products?.map((p: any) => (
          <div key={p.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-800">
            <div className="flex items-center gap-4">
              <img src={p.image_path} className="w-16 h-16 object-cover rounded" />
              <div>
                <p className="font-bold">{p.name}</p>
                <p className="text-rose-400">${p.price}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="text-blue-400 font-semibold">Editar</button>
              <button onClick={() => deleteProduct.mutate(p.id)} className="text-red-500 font-semibold">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
      <button className="fixed bottom-10 right-10 bg-rose-800 p-5 rounded-full shadow-lg font-bold hover:scale-105 transition-transform">+ Nuevo Producto</button>
    </div>
  );
}
