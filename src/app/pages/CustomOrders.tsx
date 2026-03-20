import { Scissors, Upload, MessageSquare, CheckCircle } from "lucide-react";

export default function CustomOrders() {
  return (
    <div className="min-h-screen bg-gray-200">   {/* color de fondo de la página */}
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Pedidos Personalizados</h1>
          <p className="text-white-50">Haz realidad tus diseños únicos con nuestro servicio de corte personalizado</p>
        </div>
      </div>

      {/* Process Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Cómo Funciona</h2>
          <p className="text-black-600 max-w-2xl mx-auto">
            Nuestro sencillo proceso de 4 pasos hace fácil obtener exactamente lo que necesitas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center border border-gray-300 p-4 rounded-lg">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
              1
            </div>
            <h3 className="font-bold mb-2">Sube tu diseño</h3>
            <p className="text-sm text-black-800">
              Envíanos tu archivo de diseño o describe tu idea
            </p>
          </div>

          <div className="text-center border border-gray-300 p-4 rounded-lg">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
              2
            </div>
            <h3 className="font-bold mb-2">Recibe cotización</h3>
            <p className="text-sm text-black-800">
              Recibe una cotización detallada en 24 horas
            </p>
          </div>

          <div className="text-center border border-gray-300 p-4 rounded-lg">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scissors className="w-8 h-8 text-black-800" />
            </div>
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
              3
            </div>
            <h3 className="font-bold mb-2">Nosotros creamos</h3>
            <p className="text-sm text-black-800">
              Tu diseño se corta con láser con máxima precisión
            </p>
          </div>

          <div className="text-center border border-gray-300 p-4 rounded-lg">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
              4
            </div>
            <h3 className="font-bold mb-2">Entrega rápida</h3>
            <p className="text-sm text-black-800">
              Recibe tus productos personalizados de forma rápida y segura
            </p>
          </div>
        </div>

        {/* Request Form */}
        <div className="max-w-3xl mx-auto bg-[#f5f5dc] rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Solicitar pedido personalizado</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tu nombre *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  placeholder="juan@ejemplo.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Número de teléfono
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de material *
              </label>
              <select className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white">
                <option>Selecciona material</option>
                <option>MDF (Madera)</option>
                <option>Otro (especificar en la descripción)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cantidad *
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                placeholder="1 - ∞"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción del proyecto *
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none bg-white"
                placeholder="Describe los requisitos de tu diseño personalizado, dimensiones y cualquier instrucción especial..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subir archivos de diseño
              </label>
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-600 transition-colors cursor-pointer bg-white/50">
                <Upload className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <p className="text-blue-600 mb-1">
                  Haz clic para subir o arrastra y suelta
                </p>
                <p className="text-sm text-gray-500">
                  SVG, PDF, AI, PNG o JPG (MÁX. 10MB)
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-green-900 text-white py-4 rounded-lg font-semibold transition-colors shadow-lg"
            >
              Enviar solicitud de pedido personalizado
            </button>
          </form>

          <p className="text-sm text-gray-800 text-center mt-4 font-medium">
            Responderemos a tu solicitud dentro de 24 horas.
          </p>
        </div>

{/* Info Section */}
        <div className="max-w-3xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-200 rounded-lg p-6 text-center border border-gray-400">
            <h3 className="font-bold text-black-900 mb-2">Sin pedido mínimo</h3>
            <p className="text-sm text-black-800">
              Pide desde una pieza o las que necesites
            </p>
          </div>

          <div className="bg-gray-200 rounded-lg p-6 text-center border border-gray-400">
            <h3 className="font-bold text-black-900 mb-2">Entrega rápida</h3>
            <p className="text-sm text-black-800">
              La mayoría de pedidos se envían en 3-5 días hábiles
            </p>
          </div>

          <div className="bg-gray-200 rounded-lg p-6 text-center border border-gray-400">
            <h3 className="font-bold text-black-900 mb-2">Asesoría experta</h3>
            <p className="text-sm text-black-800">
              Nuestro equipo te ayuda a mejorar tu diseño
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}