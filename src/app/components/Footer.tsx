import { Link } from "react-router";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Marca */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CS</span>
              </div>
              <span className="font-bold text-xl">Laserbeamx</span>
            </div>
            <p className="text-gray-400 text-sm">
            Calidad profesional en cada pieza para que solo te preocupes por crear.
            </p>
          </div>

          {/* Tienda */}
          <div>
            <h3 className="font-semibold mb-4">Tienda</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-white transition-colors">
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white transition-colors">
                  Cajas
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white transition-colors">
                  Llaveros
                </Link>
              </li>
            </ul>
          </div>

          {/* Servicio al Cliente */}
          <div>
            <h3 className="font-semibold mb-4">Servicio al Cliente</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  preguntas frecuentes
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Información de envío
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contáctanos
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="font-semibold mb-4">Conéctate con nosotros</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
             <a
  href="https://www.instagram.com/_manualidades_ss/?hl=es-es"
  target="_blank"
  rel="noopener noreferrer"
  className="w-10 h-10 bg-slate-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
  title="Síguenos en Instagram"
>
  <Instagram className="w-5 h-5" />
</a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Laserbeamx. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}