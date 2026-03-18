import { useState } from "react";
import { Filter, X } from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const products = [
    { id: 1, name: "Heart MDF Shape", price: 3.99, category: "mdf", image: "https://images.unsplash.com/photo-1584736173347-6066a69d0cd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjcmFmdCUyMHNoYXBlcyUyMGxhc2VyJTIwY3V0fGVufDF8fHx8MTc3Mzg0ODY1NXww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 2, name: "Clear Acrylic Blank", price: 5.49, category: "acrylic", image: "https://images.unsplash.com/photo-1693592401248-c9544518318a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3J5bGljJTIwYmxhbmtzJTIwY3JhZnRpbmd8ZW58MXx8fHwxNzczODQ4NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 3, name: "Circle MDF Set", price: 12.99, category: "mdf", image: "https://images.unsplash.com/photo-1651509245244-6674e242a3c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNREYlMjB3b29kJTIwc2hhcGVzJTIwY3JhZnRzfGVufDF8fHx8MTc3Mzg0ODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 4, name: "Colorful Craft Pack", price: 18.99, category: "other", image: "https://images.unsplash.com/photo-1765484253358-70f69979d307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESVklMjBjcmFmdCUyMHN1cHBsaWVzJTIwY29sb3JmdWx8ZW58MXx8fHwxNzczODQ4NjU2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 5, name: "Wooden Keychain", price: 2.99, category: "keychain", image: "https://images.unsplash.com/photo-1562770584-eaf50b017307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXljaGFpbiUyMGJsYW5rcyUyMGNyYWZ0aW5nfGVufDF8fHx8MTc3Mzg0ODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 6, name: "Decorative Star", price: 4.99, category: "seasonal", image: "https://images.unsplash.com/photo-1708398243156-844c574c34f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNlciUyMGN1dCUyMHdvb2RlbiUyMGRlY29yYXRpb258ZW58MXx8fHwxNzczODQ4NjU3fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 7, name: "Craft Organizer", price: 15.99, category: "other", image: "https://images.unsplash.com/photo-1773499129466-b80be4adc319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMHN1cHBsaWVzJTIwb3JnYW5pemVkfGVufDF8fHx8MTc3Mzg0ODY1N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 8, name: "Shapes Bundle", price: 24.99, category: "mdf", image: "https://images.unsplash.com/photo-1651509245244-6674e242a3c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNREYlMjB3b29kJTIwc2hhcGVzJTIwY3JhZnRzfGVufDF8fHx8MTc3Mzg0ODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 9, name: "Premium Acrylic Set", price: 19.99, category: "acrylic", image: "https://images.unsplash.com/photo-1693592401248-c9544518318a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3J5bGljJTIwYmxhbmtzJTIwY3JhZnRpbmd8ZW58MXx8fHwxNzczODQ4NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 10, name: "Wooden Letters", price: 8.99, category: "mdf", image: "https://images.unsplash.com/photo-1584736173347-6066a69d0cd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjcmFmdCUyMHNoYXBlcyUyMGxhc2VyJTIwY3V0fGVufDF8fHx8MTc3Mzg0ODY1NXww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 11, name: "Star Keychain Set", price: 7.99, category: "keychain", image: "https://images.unsplash.com/photo-1562770584-eaf50b017307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXljaGFpbiUyMGJsYW5rcyUyMGNyYWZ0aW5nfGVufDF8fHx8MTc3Mzg0ODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 12, name: "Holiday Ornaments", price: 14.99, category: "seasonal", image: "https://images.unsplash.com/photo-1708398243156-844c574c34f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNlciUyMGN1dCUyMHdvb2RlbiUyMGRlY29yYXRpb258ZW58MXx8fHwxNzczODQ4NjU3fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ];

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
    let priceMatch = true;
    
    if (priceRange === "under10") priceMatch = product.price < 10;
    else if (priceRange === "10to20") priceMatch = product.price >= 10 && product.price <= 20;
    else if (priceRange === "over20") priceMatch = product.price > 20;

    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Shop All Products</h1>
          <p className="text-blue-50">Browse our complete collection of craft supplies</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Filters</h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Category</h4>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Products" },
                    { value: "mdf", label: "MDF Shapes" },
                    { value: "acrylic", label: "Acrylic Blanks" },
                    { value: "keychain", label: "Keychains" },
                    { value: "seasonal", label: "Seasonal" },
                    { value: "other", label: "Other" },
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

              {/* Price Range Filter */}
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All Prices" },
                    { value: "under10", label: "Under $10" },
                    { value: "10to20", label: "$10 - $20" },
                    { value: "over20", label: "Over $20" },
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

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden fixed bottom-4 right-4 z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg"
          >
            <Filter className="w-6 h-6" />
          </button>

          {/* Mobile Filter Overlay */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowFilters(false)}>
              <div className="absolute inset-y-0 right-0 w-80 bg-white p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-sm text-gray-700 mb-3">Category</h4>
                  <div className="space-y-2">
                    {[
                      { value: "all", label: "All Products" },
                      { value: "mdf", label: "MDF Shapes" },
                      { value: "acrylic", label: "Acrylic Blanks" },
                      { value: "keychain", label: "Keychains" },
                      { value: "seasonal", label: "Seasonal" },
                      { value: "other", label: "Other" },
                    ].map((cat) => (
                      <label key={cat.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="category-mobile"
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
                  <h4 className="font-semibold text-sm text-gray-700 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {[
                      { value: "all", label: "All Prices" },
                      { value: "under10", label: "Under $10" },
                      { value: "10to20", label: "$10 - $20" },
                      { value: "over20", label: "Over $20" },
                    ].map((range) => (
                      <label key={range.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="price-mobile"
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
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} products
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
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
