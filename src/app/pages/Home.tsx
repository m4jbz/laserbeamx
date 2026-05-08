import { Link } from "react-router";
import { Truck, Scissors, Award, Mail, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-[#0B0C14]">
     
      <section className="relative min-h-[600px] flex items-center text-white overflow-hidden py-20">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid md:grid-cols-2 gap-12 items-center">
          
          {/* Columna de Texto */}
          <div className="max-w-xl md:max-w-full">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Da vida a tus <span className="text-white-500">ideas</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-200 leading-relaxed">
              Materiales de alta calidad y corte láser preciso para tus proyectos creativos y personalizados.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-rose-800 text-white px-10 py-4 rounded-full font-bold hover:bg-rose-700 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(159,18,57,0.4)]"
            >
              Contáctanos
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </div>

          <div className="relative aspect-[4/3] w-full max-w-[500px] mx-auto md:max-w-none md:mx-0">
            <img 
              src="https://codeberg.org/m4jbz/laserbeamx-images/raw/branch/main/kali.svg" 
              alt="Dragón Laserbeamx" 
              className="w-full h-full object-contain"
            />
          </div>
          
        </div>

        <div className="absolute inset-0 bg-[#0B0C14] pointer-events-none" />
      </section>

      {/* Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-gray-900/50 border border-gray-800 rounded-xl shadow-md">
            <div className="w-16 h-16 bg-rose-900/30 rounded-full flex items-center justify-center mb-4">
              <Truck className="w-8 h-8 text-rose-400" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-white">Entrega rápida</h3>
            <p className="text-gray-400 text-sm">
              Procesamos tus pedidos con rapidez y seguridad
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-gray-900/50 border border-gray-800 rounded-xl shadow-md">
            <div className="w-16 h-16 bg-rose-900/30 rounded-full flex items-center justify-center mb-4">
              <Scissors className="w-8 h-8 text-rose-400" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-white">Diseños personalizados</h3>
            <p className="text-gray-400 text-sm">
              Creamos piezas únicas adaptadas a tus ideas
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-gray-900/50 border border-gray-800 rounded-xl shadow-md">
            <div className="w-16 h-16 bg-rose-900/30 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-rose-400" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-white">Alta calidad</h3>
            <p className="text-gray-400 text-sm">
              Corte láser preciso con excelentes acabados
            </p>
          </div>
        </div>
      </section>

{/* CTA Section */}
      <section className="relative py-16 overflow-hidden bg-black">
        {/* Capa de imagen y oscurecido */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://codeberg.org/m4jbz/laserbeamx-images/raw/branch/main/bg-home.jpg" 
            alt="Fondo" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-6">
            <Mail className="w-16 h-16 text-white mx-auto mb-4 opacity-90 drop-shadow-lg" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}
          >
            Trabajemos en tu proyecto
          </h2>

<p className="text-white text-2xl md:text-2xl mb-10 drop-shadow-md font-medium max-w-3xl mx-auto">
            Cuéntanos tu idea y te ayudamos a hacerla realidad con materiales y acabados profesionales
          </p>

          <Link
            to="/custom-orders"
            className="inline-flex items-center bg-rose-800 text-white px-10 py-4 rounded-full font-semibold hover:bg-rose-700 transition-colors shadow-lg shadow-rose-900/40"
          >
            Ordenar ahora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
