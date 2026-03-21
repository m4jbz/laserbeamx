import { Link } from "react-router";

export default function Categories() {
  const categories = [
    {
      name: "Dias especiales",
      description: "Para celebrar momentos únicos con diseños significativos",
      image: "/assets/asador.jpg",
    },
    {
      name: "Acrylic Blanks",
      description: "xx",
      image: "https://images.unsplash.com/photo-1693592401248-c9544518318a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3J5bGljJTIwYmxhbmtzJTIwY3JhZnRpbmd8ZW58MXx8fHwxNzczODQ4NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Keychains",
      description: "xdcs",
      image: "https://images.unsplash.com/photo-1562770584-eaf50b017307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXljaGFpbiUyMGJsYW5rcyUyMGNyYWZ0aW5nfGVufDF8fHx8MTc3Mzg0ODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Seasonal Designs",
      description: "Hcdsc",
      image: "https://images.unsplash.com/photo-1708398243156-844c574c34f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNlciUyMGN1dCUyMHdvb2RlbiUyMGRlY29yYXRpb258ZW58MXx8fHwxNzczODQ4NjU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Letters & Numbers",
      description: "Adsvfrsv",
      image: "https://images.unsplash.com/photo-1651509245244-6674e242a3c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNREYlMjB3b29kJTIwc2hhcGVzJTIwY3JhZnRzfGVufDF8fHx8MTc3Mzg0ODY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Craft Supplies",
      description: "Essential tools and accessories for your crafting needs",
      image: "https://images.unsplash.com/photo-1773499129466-b80be4adc319?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMHN1cHBsaWVzJTIwb3JnYW5pemVkfGVufDF8fHx8MTc3Mzg0ODY1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0C14]">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-900 to-rose-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Ver articulos</h1>
          <p className="text-rose-200">Encuentra todo lo que necesitas para dar vida a tus ideas y crear proyectos únicos con la mejor calidad y precisión</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              to="/shop"
              className="group bg-gray-900/50 border border-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:shadow-rose-900/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                <span className="text-rose-400 font-semibold group-hover:underline">
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-rose-900 to-rose-800 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-rose-200 mb-6 max-w-2xl mx-auto">
            ¡Ofrecemos servicios de diseño personalizado! Déjanos crear las formas y tamaños perfectos para tu proyecto único.
          </p>
          <Link
            to="/custom-orders"
            className="inline-block bg-white text-rose-800 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Ordenar ahora
          </Link>
        </div>
      </div>
    </div>
  );
}
