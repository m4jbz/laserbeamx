import { Scissors, Upload, MessageSquare, CheckCircle } from "lucide-react";

export default function CustomOrders() {
  return (
    <div className="min-h-screen bg-[#0B0C14]">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-900 to-rose-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Pedidos Personalizados</h1>
          <p className="text-rose-200">Haz realidad tus diseños únicos con nuestro servicio de corte personalizado</p>
        </div>
      </div>

      {/* Process Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Cómo Funciona</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Nuestro sencillo proceso de 4 pasos hace fácil obtener exactamente lo que necesitas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center bg-gray-900/50 border border-gray-800 p-6 rounded-xl">
            <div className="w-16 h-16 bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-rose-400" />
            </div>
            <div className="w-8 h-8 bg-rose-800 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
              1
            </div>
            <h3 className="font-bold mb-2 text-white">Sube tu diseño</h3>
            <p className="text-sm text-gray-400">
              Envíanos tu archivo de diseño o describe tu idea
            </p>
          </div>

          <div className="text-center bg-gray-900/50 border border-gray-800 p-6 rounded-xl">
            <div className="w-16 h-16 bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-rose-400" />
            </div>
            <div className="w-8 h-8 bg-rose-800 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
              2
            </div>
            <h3 className="font-bold mb-2 text-white">Recibe cotización</h3>
            <p className="text-sm text-gray-400">
              Recibe una cotización detallada en 24 horas
            </p>
          </div>

          <div className="text-center bg-gray-900/50 border border-gray-800 p-6 rounded-xl">
            <div className="w-16 h-16 bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scissors className="w-8 h-8 text-rose-400" />
            </div>
            <div className="w-8 h-8 bg-rose-800 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
              3
            </div>
            <h3 className="font-bold mb-2 text-white">Nosotros creamos</h3>
            <p className="text-sm text-gray-400">
              Tu diseño se corta con láser con máxima precisión
            </p>
          </div>

          <div className="text-center bg-gray-900/50 border border-gray-800 p-6 rounded-xl">
            <div className="w-16 h-16 bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-rose-400" />
            </div>
            <div className="w-8 h-8 bg-rose-800 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
              4
            </div>
            <h3 className="font-bold mb-2 text-white">Entrega rápida</h3>
            <p className="text-sm text-gray-400">
              Recibe tus productos personalizados de forma rápida y segura
            </p>
          </div>
        </div>

        {/* Request Form */}
        <div className="max-w-3xl mx-auto bg-gray-900/70 border border-gray-800 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Solicitar pedido personalizado</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Tu nombre *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-800 bg-gray-800 text-white placeholder-gray-500"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-800 bg-gray-800 text-white placeholder-gray-500"
                  placeholder="juan@ejemplo.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Número de teléfono
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-800 bg-gray-800 text-white placeholder-gray-500"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Tipo de material *
              </label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-800 bg-gray-800 text-white">
                <option>Selecciona material</option>
                <option>MDF (Madera)</option>
                <option>Otro (especificar en la descripción)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Cantidad *
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-800 bg-gray-800 text-white placeholder-gray-500"
                placeholder="1 - ∞"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Descripción del proyecto *
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-800 resize-none bg-gray-800 text-white placeholder-gray-500"
                placeholder="Describe los requisitos de tu diseño personalizado, dimensiones y cualquier instrucción especial..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Subir archivos de diseño
              </label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-rose-700 transition-colors cursor-pointer bg-gray-800/50">
                <Upload className="w-12 h-12 text-rose-400 mx-auto mb-3" />
                <p className="text-rose-400 mb-1">
                  Haz clic para subir o arrastra y suelta
                </p>
                <p className="text-sm text-gray-500">
                  SVG, PDF, AI, PNG o JPG (MÁX. 10MB)
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-rose-800 hover:bg-rose-700 text-white py-4 rounded-lg font-semibold transition-colors shadow-lg shadow-rose-900/40"
            >
              Enviar solicitud de pedido personalizado
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center mt-4 font-medium">
            Responderemos a tu solicitud dentro de 24 horas.
          </p>
        </div>

        {/* Info Section */}
        <div className="max-w-3xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 rounded-lg p-6 text-center border border-gray-800">
            <h3 className="font-bold text-white mb-2">Sin pedido mínimo</h3>
            <p className="text-sm text-gray-400">
              Pide desde una pieza o las que necesites
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6 text-center border border-gray-800">
            <h3 className="font-bold text-white mb-2">Entrega rápida</h3>
            <p className="text-sm text-gray-400">
              La mayoría de pedidos se envían en 3-5 días hábiles
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6 text-center border border-gray-800">
            <h3 className="font-bold text-white mb-2">Asesoría experta</h3>
            <p className="text-sm text-gray-400">
              Nuestro equipo te ayuda a mejorar tu diseño
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
