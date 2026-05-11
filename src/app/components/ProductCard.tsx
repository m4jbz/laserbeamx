import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Product } from "../../api/products";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, cartItems, updateQuantity } = useCart();

  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );

  const quantityInCart = cartItem?.quantity || 0;

  const decrement = () => {
    if (quantityInCart > 0) {
      updateQuantity(product.id, quantityInCart - 1);
    }
  };

  const increment = () => {
    if (quantityInCart === 0) {
      addItem(product, 1);
    } else {
      updateQuantity(product.id, quantityInCart + 1);
    }
  };

  return (
    <div className="group relative overflow-visible">
      {/* Card */}
      <div className="relative bg-gray-900/50 border border-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1">

        {/* Imagen */}
        <div className="aspect-square overflow-hidden bg-gray-800">
          <ImageWithFallback
            src={product.imagePath}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Contenido */}
        <div className="p-4">
          <h3 className="font-medium text-white mb-3">
            {product.name}
          </h3>

          <div className="flex items-center justify-between gap-2">
            <span className="text-2xl font-bold text-amber-400">
              ${product.price.toFixed(2)}
            </span>

            {quantityInCart === 0 ? (
              <button
                onClick={() => addItem(product, 1)}
                className="bg-rose-800 hover:bg-rose-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm">Añadir</span>
              </button>
            ) : (
              <div className="relative">

                <div className="absolute -top-9 right-0 bg-green-800 text-white text-xs font-bold min-w-[50px] h-7 px-2 rounded-full flex items-center justify-center shadow-lg z-10">
                  {quantityInCart}
                </div>

                <div className="flex items-center bg-white/5 border border-white/10 rounded-full overflow-hidden">
                  <button
                    onClick={decrement}
                    className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 transition-colors text-lg"
                  >
                    −
                  </button>

                  <span className="min-w-[30px] text-center text-sm font-semibold text-white select-none">
                    {quantityInCart}
                  </span>

                  <button
                    onClick={increment}
                    className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 transition-colors text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}