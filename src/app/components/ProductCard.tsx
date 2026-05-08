import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Product } from "../../api/products";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group bg-gray-900/50 border border-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-rose-900/20 hover:-translate-y-1">
      <div className="aspect-square overflow-hidden bg-gray-800">
        <ImageWithFallback
          src={product.imagePath}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-white mb-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-400">
            ${product.price.toFixed(2)}
          </span>
          <button 
            onClick={() => addItem(product, 1)}
            className="bg-rose-800 hover:bg-rose-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">Añadir</span>
          </button>
        </div>
      </div>
    </div>
  );
}
