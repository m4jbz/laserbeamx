import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/products";
import ProductCard from "../components/ProductCard";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    let matchesPrice = true;
    if (priceRange === "under50") matchesPrice = product.price < 50;
    else if (priceRange === "50to100") matchesPrice = product.price >= 50 && product.price <= 100;
    else if (priceRange === "over100") matchesPrice = product.price > 100;

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-[#0B0C14] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Nuestra Tienda</h1>
            <p className="text-gray-400">Explora nuestra colección de productos personalizados con corte láser.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="w-4 h-4 text-rose-500" />
                <h2 className="font-bold text-white uppercase tracking-wider text-sm">Filtros</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-3">Rango de Precio</label>
                  <div className="space-y-2">
                    {["all", "under50", "50to100", "over100"].map((range) => (
                      <button
                        key={range}
                        onClick={() => setPriceRange(range)}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          priceRange === range 
                            ? "bg-rose-900/20 text-rose-400 border border-rose-900/50" 
                            : "text-gray-400 hover:bg-gray-800/50"
                        }`}
                      >
                        {range === "all" ? "Todos los precios" : 
                         range === "under50" ? "Menos de $50" :
                         range === "50to100" ? "$50 - $100" : "Más de $100"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-gray-900/50 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-gray-500">
                    Mostrando <span className="text-white font-medium">{filteredProducts.length}</span> productos
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-gray-500">No se encontraron productos que coincidan con tu búsqueda.</p>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
