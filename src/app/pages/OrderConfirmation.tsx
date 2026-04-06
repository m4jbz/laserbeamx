import { useLocation, useNavigate, Navigate } from 'react-router';
import { CheckCircle } from 'lucide-react';
import { 
  PaymentMethod,
  DeliveryType,
  paymentMethodLabels, 
  deliveryTypeLabels 
} from '../../api/orders';

const WHATSAPP_PHONE = import.meta.env.VITE_ADMIN_WHATSAPP;

type CartItemData = {
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
};

type OrderData = {
  ticketNumber: string;
  clientName: string;
  phoneNumber: string;
  total: number;
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
  notes?: string | null;
  cartItems: CartItemData[];
};

function buildWhatsAppMessage(order: OrderData): string {
  const lines: string[] = [
    `*Nuevo pedido*`,
    ``,
    `Ticket: ${order.ticketNumber}`,
    `Cliente: ${order.clientName}`,
    `Telefono: ${order.phoneNumber}`,
    ``,
    `Productos:`,
  ];

  for (const item of order.cartItems) {
    lines.push(`- ${item.name} x${item.quantity} = $${item.subtotal.toFixed(2)}`);
  }

  lines.push(``);
  lines.push(`Total: $${order.total.toFixed(2)} MXN`);
  lines.push(``);
  lines.push(`Entrega: ${deliveryTypeLabels[order.deliveryType]}`);
  lines.push(`Pago: ${paymentMethodLabels[order.paymentMethod]}`);

  if (order.notes) {
    lines.push(``);
    lines.push(`Notas: ${order.notes}`);
  }

  return lines.join('\n');
}

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = (location.state as { order?: OrderData })?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const message = buildWhatsAppMessage(order);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen bg-[#0B0C14] text-white p-6 md:p-10">
      <div className="max-w-lg mx-auto">
        {/* Confirmacion */}
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Pedido realizado</h1>
          <p className="text-gray-400 text-sm mb-4">
            Tu numero de ticket es:
          </p>
          <p className="text-3xl font-bold text-rose-500 mb-6">
            {order.ticketNumber}
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold transition-colors mb-3"
          >
            Enviar por WhatsApp
          </a>
          <p className="text-xs text-gray-500">
            Confirma tu pedido enviando un mensaje
          </p>
        </div>

        {/* Resumen */}
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5 mb-6">
          <h2 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">
            Resumen
          </h2>

          <div className="space-y-2 text-sm mb-4">
            {order.cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span className="text-gray-300">{item.name} x{item.quantity}</span>
                <span className="text-gray-400">${item.subtotal.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-amber-400">${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Info */}
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5 mb-8">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Cliente</span>
              <span>{order.clientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Telefono</span>
              <span>{order.phoneNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Entrega</span>
              <span>{deliveryTypeLabels[order.deliveryType]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Pago</span>
              <span>{paymentMethodLabels[order.paymentMethod]}</span>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors text-sm"
          >
            Inicio
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="flex-1 bg-rose-800 hover:bg-rose-700 text-white py-3 rounded-lg font-medium transition-colors text-sm"
          >
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  );
}
