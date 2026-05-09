import { Link } from "react-router";
import { Facebook, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B0C14] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Marca */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              
              <img 
                src="https://codeberg.org/m4jbz/laserbeamx-images/raw/branch/main/kali.svg" 
                alt="Logo Laserbeamx" 
                className="w-10 h-10 object-contain"
              />

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
            </ul>
          </div>

          {/* Servicio al Cliente */}
<div>
     <h3 className="font-semibold mb-4">Servicio al Cliente</h3>
      <ul className="space-y-2 text-sm">
       <li>
        <Link 
         to="/contact#faq" 
         className="text-gray-400 hover:text-white transition-colors"
    >
          Preguntas frecuentes
        </Link>
</li>
    
    <li>
      {/* Contacto */}
      <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
        Contáctanos
      </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="font-semibold mb-4">Conéctate con nosotros</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-rose-800 rounded-full flex items-center justify-center transition-colors"
                title="Facebook no disponible"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="https://www.instagram.com/_manualidades_ss/?hl=es-es"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-rose-800 rounded-full flex items-center justify-center transition-colors"
                title="Síguenos en Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="mailto:alanslgado@gmail.com"
                className="w-10 h-10 bg-gray-800 hover:bg-rose-800 rounded-full flex items-center justify-center transition-colors"
                title="Envíanos un correo"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Barra Inferior */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Laserbeamx. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
