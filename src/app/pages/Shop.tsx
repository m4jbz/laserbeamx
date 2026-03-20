import { useState } from "react";
import { Filter, X } from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const products = [
    { id: 1, name: "Cervilletero de Boda", price: 49.99, category: "MDF", image: "/assets/cervilletero boda.png" },
    { id: 2, name: "Cruz de boda", price: 99.99, category: "MDF", image: "/assets/Cruz-con-boda.jpg" },
    { id: 3, name: "Portaretrato de pareja", price: 49.99, category: "MDF", image: "/assets/portaretrato pareja.jpg" },
    { id: 4, name: "Recuerdo 15 años", price: 49.99, category: "MDF", image: "/assets/recuerdo 15 years.jpeg" },
    { id: 5, name: "Retrato de Gato con Botas", price: 99.99, category: "MDF", image: "/assets/retrato gato con botas.jpeg" },
    { id: 6, name: "Rosa para Mamá", price: 49.99, category: "MDF", image: "/assets/rosa para mama.jpeg" },
    { id: 7, name: "Portaretrato para Mamá", price: 49.99, category: "MDF", image: "/assets/porta retrato mama.jpeg" },
    { id: 8, name: "Portaretrato de Pájaros", price: 49.99, category: "MDF", image: "/assets/portaretrato pajaros.jpg" },
    { id: 9, name: "Nuestra Boda", price: 199.00, category: "MDF", image: "/assets/nuestra boda.jpeg" },
    { id: 10, name: "Mandala de Lobo", price: 99.99, category: "MDF", image: "/assets/mandala lobo.jpg" },
    { id: 11, name: "Llavero de Corazón", price: 49.99, category: "keychain", image: "/assets/llavero corazon.png" },
    { id: 12, name: "Detalle de Pareja", price: 49.99, category: "MDF", image: "/assets/detalle pareja.jpeg" },
    { id: 13, name: "Flores de Miniatura", price: 49.99, category: "MDF", image: "/assets/flores miniatura.jpeg" },
    { id: 14, name: "Caja Corrediza", price: 99.99, category: "MDF", image: "/assets/caja corrediza.jpeg" },
    { id: 15, name: "Recuerdo de Boda", price: 199.00, category: "MDF", image: "/assets/boda1.jpeg" },
  ];

  const filteredProducts = products.filter((product) => {
    const categoryMatch = 
      selectedCategory === "all" || 
      product.category.toLowerCase() === selectedCategory.toLowerCase();

    let priceMatch = true;
    if (priceRange === "under50") {
      priceMatch = product.price < 50; 
    } else if (priceRange === "50to100") {
      priceMatch = product.price >= 50 && product.price <= 100;
    } else if (priceRange === "over100") {
      priceMatch = product.price > 100;
    }

    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-12">
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
              
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Categoría</h4>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "Todos los productos" },
                    { value: "mdf", label: "Formas MDF" },
                    { value: "keychain", label: "Llaveros" },
                    { value: "other", label: "Otros" },
                  ].map((cat) => (
                    <label key={cat.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={selectedCategory === cat.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Rango de Precio</h4>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "Todos los precios" },
                    { value: "under50", label: "Menos de $50" },
                    { value: "50to100", label: "$50 - $100" },
                    { value: "over100", label: "Más de $100" },
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
            <div className="mb-6">
              <p className="text-gray-600 font-medium">
                Mostrando {filteredProducts.length} productos
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
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
          </div>
        </div>
      </div>
    </div>
  );
}