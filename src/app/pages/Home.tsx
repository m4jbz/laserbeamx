import { Link } from "react-router";
import { Truck, Scissors, Award, Mail, ArrowRight } from "lucide-react";

export default function Home() {
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
              Da vida a tus ideas
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-50">
              Materiales de alta calidad y corte láser preciso para tus proyectos creativos y personalizados.
            </p>
            <Link
              to="/custom-orders"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Contáctanos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Entrega rápida</h3>
            <p className="text-gray-600 text-sm">
              Procesamos tus pedidos con rapidez y seguridad
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Scissors className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Diseños personalizados</h3>
            <p className="text-gray-600 text-sm">
              Creamos piezas únicas adaptadas a tus ideas
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Alta calidad</h3>
            <p className="text-gray-600 text-sm">
              Corte láser preciso con excelentes acabados
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <Mail className="w-16 h-16 text-white mx-auto mb-4 opacity-90 drop-shadow-lg" />
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}
          >
            Trabajemos en tu proyecto
          </h2>

          <p className="text-blue-50 text-lg mb-8 drop-shadow-md">
            Cuéntanos tu idea y te ayudamos a hacerla realidad con materiales y acabados profesionales
          </p>

          <Link
            to="/custom-orders"
            className="inline-flex items-center bg-white text-blue-600 px-10 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg border border-white/30"
          >
            Ordenar ahora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}