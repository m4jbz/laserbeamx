import { Link } from "react-router";
import { Truck, Scissors, Award, Mail, ArrowRight } from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Heart MDF Shape",
      price: 3.99,
      image: "https://images.unsplash.com/photo-1584736173347-6066a69d0cd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjcmFmdCUyMHNoYXBlcyUyMGxhc2VyJTIwY3V0fGVufDF8fHx8MTc3Mzg0ODY1NXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      name: "Clear Acrylic Blank",
      price: 5.49,
      image: "https://images.unsplash.com/photo-1693592401248-c9544518318a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3J5bGljJTIwYmxhbmtzJTIwY3JhZnRpbmd8ZW58MXx8fHwxNzczODQ4NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      name: "Circle MDF Set",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1651509245244-6674e242a3c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNREYlMjB3b29kJTIwc2hhcGVzJTIwY3JhZnRzfGVufDF8fHx8MTc3Mzg0ODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 4,
      name: "Colorful Craft Supply Pack",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1765484253358-70f69979d307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESVklMjBjcmFmdCUyMHN1cHBsaWVzJTIwY29sb3JmdWx8ZW58MXx8fHwxNzczODQ4NjU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const categories = [
    {
      name: "MDF Shapes",
      image: "https://images.unsplash.com/photo-1584736173347-6066a69d0cd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjcmFmdCUyMHNoYXBlcyUyMGxhc2VyJTIwY3V0fGVufDF8fHx8MTc3Mzg0ODY1NXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Acrylic Blanks",
      image: "https://images.unsplash.com/photo-1693592401248-c9544518318a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3J5bGljJTIwYmxhbmtzJTIwY3JhZnRpbmd8ZW58MXx8fHwxNzczODQ4NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Keychains",
      image: "https://images.unsplash.com/photo-1562770584-eaf50b017307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXljaGFpbiUyMGJsYW5rcyUyMGNyYWZ0aW5nfGVufDF8fHx8MTc3Mzg0ODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Seasonal Designs",
      image: "https://images.unsplash.com/photo-1708398243156-844c574c34f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNlciUyMGN1dCUyMHdvb2RlbiUyMGRlY29yYXRpb258ZW58MXx8fHwxNzczODQ4NjU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const moreProducts = [
    {
      id: 5,
      name: "Wooden Keychain Blank",
      price: 2.99,
      image: "https://images.unsplash.com/photo-1562770584-eaf50b017307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXljaGFpbiUyMGJsYW5rcyUyMGNyYWZ0aW5nfGVufDF8fHx8MTc3Mzg0ODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 6,
      name: "Decorative Wooden Star",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1708398243156-844c574c34f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNlciUyMGN1dCUyMHdvb2RlbiUyMGRlY29yYXRpb258ZW58MXx8fHwxNzczODQ4NjU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 7,
      name: "Craft Supply Organizer",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1773499129466-b80be4adc319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMHN1cHBsaWVzJTIwb3JnYW5pemVkfGVufDF8fHx8MTc3Mzg0ODY1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 8,
      name: "Mixed Shapes Bundle",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1651509245244-6674e242a3c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNREYlMjB3b29kJTIwc2hhcGVzJTIwY3JhZnRzfGVufDF8fHx8MTc3Mzg0ODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 9,
      name: "Premium Acrylic Set",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1693592401248-c9544518318a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3J5bGljJTIwYmxhbmtzJTIwY3JhZnRpbmd8ZW58MXx8fHwxNzczODQ4NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 10,
      name: "Wooden Letters",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1584736173347-6066a69d0cd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjcmFmdCUyMHNoYXBlcyUyMGxhc2VyJTIwY3V0fGVufDF8fHx8MTc3Mzg0ODY1NXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-blue-400 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Unleash Your Creativity
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-50">
              Discover premium laser-cut MDF shapes, acrylic blanks, and custom craft supplies. 
              Perfect for DIY projects, personalization, and creative expression.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured / New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            New Arrivals
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check out our latest collection of premium craft supplies
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </section>

      {/* Category Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600">
              Explore our wide range of craft supplies
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/categories"
                className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo / Value Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Fast Shipping</h3>
            <p className="text-gray-600 text-sm">
              Quick turnaround on all orders with reliable tracking
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Scissors className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Custom Designs</h3>
            <p className="text-gray-600 text-sm">
              Request personalized shapes and sizes for your projects
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">High Quality</h3>
            <p className="text-gray-600 text-sm">
              Precision laser-cut products with smooth edges
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid (Main Shop Preview) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Products
            </h2>
            <p className="text-gray-600">
              Customer favorites and bestsellers
            </p>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            View All
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {moreProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            to="/shop"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            View All Products
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* CTA / Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <Mail className="w-16 h-16 text-white mx-auto mb-4 opacity-90" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Creative Community
          </h2>
          <p className="text-blue-50 text-lg mb-8">
            Get exclusive offers, craft inspiration, and new product updates delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}