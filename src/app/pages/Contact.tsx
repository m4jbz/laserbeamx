import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Contactanos</h1>
          <p className="text-blue-50">Estamos aquí para ayudarte con cualquier pregunta o preocupación</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Por lo general respondemos dentro de 24 horas.
                  </p>
                  <a
                    href="mailto:hello@craftshapes.com"
                    className="text-blue-600 hover:underline"
                  >
                    alanslgado@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Telefono</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Atención al cliente.
                  </p>
                  <a
                    href="tel:+15551234567"
                    className="text-blue-600 hover:underline"
                  >
                    (770) 127-7970
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Dirección</h3>
                  <p className="text-gray-600 text-sm">
                    Calle: Bandera Nacional<br />
                    Iguala de la independecia, CP: 40000<br />
                    Guerrero, México
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Horario</h3>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p>Lunes - Viernes: 9:00 AM - 5:00 PM</p>
                    <p>Sabado: 10:00 AM - 2:00 PM</p>
                    <p>Domingo: Cerrado</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envianos un mensaje</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Johan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Santana"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Numero de telefono:
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="(733) 173-7362"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Asunto:
                </label>
<select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600">
  <option>Selecciona un asunto</option>
  <option>Consulta general</option>
  <option>Estado del pedido</option>
  <option>Pregunta sobre producto</option>
  <option>Devoluciones e intercambios</option>
  <option>Otro</option>
</select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Describenos el asunto:
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                  placeholder="Describe tu duda..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Enviar Mensaje
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center mt-4">
              Normalmente respondemos dentro de 24 horas.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
<div className="mt-16">
  <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
    Preguntas Frecuentes
  </h2>
  
  <div className="max-w-3xl mx-auto space-y-4">
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-bold text-gray-900 mb-2">
        ¿Qué tipo de MDF utilizan para manualidades?
      </h3>
      <p className="text-gray-600 text-sm">
        Utilizamos MDF de alta calidad con grosor de 3mm, ideal para pintura y decoración. 
        Es perfecto para proyectos como letreros, cajas, figuras y artículos personalizados.
      </p>
    </div>

    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-bold text-gray-900 mb-2">
        ¿El MDF se puede pintar fácilmente?
      </h3>
      <p className="text-gray-600 text-sm">
        Sí, el MDF es un material excelente para pintar. Se recomienda sellar la superficie primero 
        para obtener un mejor acabado, y luego aplicar pinturas acrílicas o en spray según tu proyecto.
      </p>
    </div>

    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-bold text-gray-900 mb-2">
        ¿Hacen diseños personalizados en MDF?
      </h3>
      <p className="text-gray-600 text-sm">
        Sí, realizamos cortes y diseños personalizados en MDF. Puedes enviarnos tu idea o diseño, 
        y te ayudamos a hacerlo realidad con corte láser o grabado.
      </p>
    </div>

    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-bold text-gray-900 mb-2">
        ¿Cómo debo cuidar mis piezas de MDF?
      </h3>
      <p className="text-gray-600 text-sm">
        Se recomienda mantener las piezas en lugares secos y evitar la exposición directa al agua. 
        Para mayor durabilidad, puedes sellarlas o barnizarlas después de decorarlas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
