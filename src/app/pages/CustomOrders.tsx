import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Scissors, Upload, MessageSquare, CheckCircle, X, Loader2, Image as ImageIcon } from "lucide-react";
import { uploadCustomerImageToCodeberg } from "../../api/codeberg";

const ADMIN_WHATSAPP = import.meta.env.VITE_ADMIN_WHATSAPP;

type FormData = {
  name: string;
  email: string;
  phone: string;
  material: string;
  quantity: number;
  description: string;
};

export default function CustomOrders() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      material: "",
      quantity: 1,
      description: "",
    },
  });

  // Dropzone config
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Validar tamaño (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setImageError("La imagen no debe superar 10MB");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"],
      "application/pdf": [".pdf"],
      "image/svg+xml": [".svg"],
    },
    maxFiles: 1,
  });

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageError(null);
  };

  const generateWhatsAppMessage = (data: FormData, imageUrl: string | null): string => {
    const materialLabel = data.material === "mdf" ? "MDF (Madera)" : 
                          data.material === "otro" ? "Otro (ver descripción)" : 
                          data.material;

    let message = `*PEDIDO PERSONALIZADO*\n\n`;
    message += `*Nombre:* ${data.name}\n`;
    message += `*Email:* ${data.email}\n`;
    if (data.phone) {
      message += `*Teléfono:* ${data.phone}\n`;
    }
    message += `\n`;
    message += `*Material:* ${materialLabel}\n`;
    message += `*Cantidad:* ${data.quantity}\n`;
    message += `\n`;
    message += `*Descripción:*\n${data.description}\n`;
    message += `\n`;
    message += `*Imagen de referencia:*\n`;
    message += imageUrl ? imageUrl : "No adjuntó imagen";

    return message;
  };

  const openWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      let imageUrl: string | null = null;

      // Subir imagen si existe
      if (imageFile) {
        try {
          imageUrl = await uploadCustomerImageToCodeberg(imageFile);
        } catch (err) {
          setImageError(err instanceof Error ? err.message : "Error al subir imagen");
          setIsSubmitting(false);
          return;
        }
      }

      // Generar mensaje y abrir WhatsApp
      const message = generateWhatsAppMessage(data, imageUrl);
      openWhatsApp(message);

      // Limpiar formulario
      reset();
      setImageFile(null);
      setImagePreview(null);
      setIsSubmitting(false);
    } catch (err) {
      console.error("Error al enviar:", err);
      setIsSubmitting(false);
    }
  };

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
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Tu nombre *
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-800 bg-gray-800 text-white placeholder-gray-500 ${
                    errors.name ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder="Juan Pérez"
                  {...register("name", { required: "El nombre es requerido" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-800 bg-gray-800 text-white placeholder-gray-500 ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  }`}
                  placeholder="juan@ejemplo.com"
                  {...register("email", {
                    required: "El correo es requerido",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Correo inválido",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
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
                {...register("phone")}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Tipo de material *
              </label>
              <select
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-800 bg-gray-800 text-white ${
                  errors.material ? "border-red-500" : "border-gray-700"
                }`}
                {...register("material", { required: "Selecciona un material" })}
              >
                <option value="">Selecciona material</option>
                <option value="mdf">MDF (Madera)</option>
                <option value="otro">Otro (especificar en la descripción)</option>
              </select>
              {errors.material && (
                <p className="text-red-500 text-sm mt-1">{errors.material.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Cantidad *
              </label>
              <input
                type="number"
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-800 bg-gray-800 text-white placeholder-gray-500 ${
                  errors.quantity ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="1"
                min="1"
                {...register("quantity", {
                  required: "La cantidad es requerida",
                  min: { value: 1, message: "Mínimo 1" },
                  valueAsNumber: true,
                })}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Descripción del proyecto *
              </label>
              <textarea
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-800 resize-none bg-gray-800 text-white placeholder-gray-500 ${
                  errors.description ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="Describe los requisitos de tu diseño personalizado, dimensiones y cualquier instrucción especial..."
                {...register("description", {
                  required: "La descripción es requerida",
                  minLength: { value: 10, message: "Mínimo 10 caracteres" },
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Dropzone para imagen */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Subir imagen de referencia (opcional)
              </label>
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <span className="absolute bottom-2 left-2 bg-black/70 text-xs px-2 py-1 rounded text-white">
                    {imageFile?.name}
                  </span>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors bg-gray-800/50 ${
                    isDragActive
                      ? "border-rose-500 bg-rose-500/10"
                      : "border-gray-700 hover:border-rose-700"
                  }`}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <>
                      <Upload className="w-12 h-12 text-rose-400 mx-auto mb-3" />
                      <p className="text-rose-400">Suelta la imagen aquí</p>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-12 h-12 text-rose-400 mx-auto mb-3" />
                      <p className="text-rose-400 mb-1">
                        Haz clic para subir o arrastra y suelta
                      </p>
                      <p className="text-sm text-gray-500">
                        SVG, PDF, PNG o JPG (MÁX. 10MB)
                      </p>
                    </>
                  )}
                </div>
              )}
              {imageError && (
                <p className="text-red-500 text-sm mt-1">{imageError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-rose-800 hover:bg-rose-700 disabled:bg-rose-900 disabled:cursor-not-allowed text-white py-4 rounded-lg font-semibold transition-colors shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {imageFile ? "Subiendo imagen..." : "Enviando..."}
                </>
              ) : (
                <>
                  <MessageSquare className="h-5 w-5" />
                  Enviar por WhatsApp
                </>
              )}
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center mt-4 font-medium">
            Se abrirá WhatsApp con tu solicitud. Responderemos dentro de 24 horas.
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
