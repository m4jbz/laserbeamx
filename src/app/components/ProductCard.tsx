import { ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
}

export default function ProductCard({ image, name, price }: ProductCardProps) {
  return (
    <div className="group bg-gray-900/50 border border-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-rose-900/20 hover:-translate-y-1">
      <div className="aspect-square overflow-hidden bg-gray-800">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-white mb-2">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-400">
            ${price.toFixed(2)}
          </span>
          <button className="bg-rose-800 hover:bg-rose-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-colors">
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}