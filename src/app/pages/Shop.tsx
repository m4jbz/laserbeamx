import { useState } from "react"
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../../api/products";

export default function Shop() {
  const [priceRange, setPriceRange] = useState("all");

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const filteredProducts = products.filter((product) => {
    if (priceRange === "under50")  return product.price < 50;
    if (priceRange === "50to100")  return product.price >= 50 && product.price <= 100;
    if (priceRange === "over100")  return product.price > 100;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Tienda de Productos</h1>
          <p className="text-blue-50">Explora nuestra colección completa</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Filtros</h3>
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Rango de Precio</h4>
                <div className="space-y-2">
                  {[
                    { value: "all",      label: "Todos los precios" },
                    { value: "under50",  label: "Menos de $50" },
                    { value: "50to100",  label: "$50 - $100" },
                    { value: "over100",  label: "Más de $100" },
                  ].map((range) => (
                    <label key={range.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        value={range.value}
                        checked={priceRange === range.value}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {isLoading && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">Cargando productos...</p>
              </div>
            )}

            {isError && (
              <div className="text-center py-16">
                <p className="text-red-500 text-lg">Error al cargar los productos.</p>
              </div>
            )}

            {!isLoading && !isError && (
              <>
                <div className="mb-6">
                  <p className="text-gray-600 font-medium">
                    Mostrando {filteredProducts.length} productos
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      image={product.image_path}
                      name={product.name}
                      price={product.price}
                    />
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-16 w-full">
                    <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
                      <p className="text-gray-600 text-xl font-semibold">
                        Sin existencias disponibles
                      </p>
                      <p className="text-gray-400 mt-2">
                        No hay productos que coincidan con la selección actual.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
