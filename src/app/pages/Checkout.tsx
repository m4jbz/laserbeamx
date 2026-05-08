import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router'; 
import { useOrders } from '../context/OrderContext';


export default function Checkout() {
  const { cartItems, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod] = useState<'transferencia'>('transferencia');
  const [deliveryType, setDeliveryType] = useState<'local' | 'domicilio'>('local');
  const [address, setAddress] = useState({
    street: '',
    number: '',
    colony: '',
    city: '',
    references: '',
  });
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState<any>({});

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
  };

  const validateForm = () => {
    const errors: any = {};
    if (!customerName.trim()) errors.customerName = 'El nombre del cliente es requerido.';
    if (phoneNumber.length !== 10) errors.phoneNumber = 'El número de teléfono debe tener 10 dígitos.';
    if (deliveryType === 'domicilio') {
      if (!address.street.trim()) errors.street = 'La calle es requerida.';
      if (!address.number.trim()) errors.number = 'El número es requerido.';
      if (!address.colony.trim()) errors.colony = 'La colonia es requerida.';
      if (!address.city.trim()) errors.city = 'La ciudad es requerida.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Por favor, corrige los errores en el formulario.');
      return;
    }

    const orderDetails = {
      customerName,
      phoneNumber,
      paymentMethod,
      deliveryType,
      address: deliveryType === 'domicilio' ? address : null,
      notes,
      cartItems: cartItems.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price })),
      total: getTotalPrice(),
      date: new Date().toISOString(),
    };

    addOrder(orderDetails);
    alert('Pedido realizado con éxito!');
    clearCart();
    navigate('/shop');
  };

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-[#0B0C14] text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-rose-500 mb-8">Finalizar Compra</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/50 rounded-2xl border border-gray-800">
            <p className="text-xl text-gray-400 mb-6">Tu carrito está vacío.</p>
            <button 
              onClick={() => navigate('/shop')}
              className="bg-rose-800 hover:bg-rose-700 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95"
            >
              Ir a la Tienda
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna de Carrito */}
            <div className="lg:col-span-2 bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-semibold mb-6">Tu Carrito ({cartItems.length} productos)</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-4">
                      <img src={item.image_path} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div>
                        <p className="font-bold text-gray-100">{item.name}</p>
                        <p className="text-rose-400">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-lg font-bold w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end items-center mt-8 pt-4 border-t border-gray-700">
                <p className="text-xl font-bold">Total: <span className="text-amber-400">${totalPrice.toFixed(2)}</span></p>
              </div>
            </div>

            {/* Columna de Formulario de Pedido */}
            <div className="lg:col-span-1 bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-semibold mb-6">Datos del Pedido</h2>
              <form onSubmit={handleSubmitOrder} className="space-y-5">
                <div>
                  <label htmlFor="customerName" className="block text-gray-300 text-sm font-bold mb-2">Nombre del Cliente:</label>
                  <input
                    type="text"
                    id="customerName"
                    className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-rose-500"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  {formErrors.customerName && <p className="text-red-400 text-xs mt-1">{formErrors.customerName}</p>}
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-gray-300 text-sm font-bold mb-2">Número Telefónico (10 dígitos):</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-rose-500"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    maxLength={10}
                  />
                  {formErrors.phoneNumber && <p className="text-red-400 text-xs mt-1">{formErrors.phoneNumber}</p>}
                </div>

                {/* Método de Pago: Transferencia */}
                <div>
                  <label className="block text-gray-300 text-sm font-bold mb-2">Método de Pago:</label>
                  <div className="p-4 bg-gray-800/70 rounded-lg border border-rose-800/60">
                    <p className="text-gray-200 font-semibold mb-1">💳 Transferencia Bancaria</p>
                    <p className="text-gray-400 text-xs mb-2">Realiza tu pago a la siguiente cuenta y envía el comprobante:</p>
                    <div className="bg-gray-900 rounded p-3 flex items-center justify-between gap-2">
                      <span className="text-amber-400 font-mono text-sm tracking-widest select-all">
                        722969010216825404
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-bold mb-2">Tipo de Entrega:</label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="deliveryType"
                        value="local"
                        checked={deliveryType === 'local'}
                        onChange={() => setDeliveryType('local')}
                        className="form-radio text-rose-600"
                      />
                      <span className="ml-2 text-gray-300">Recoger en Local</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="deliveryType"
                        value="domicilio"
                        checked={deliveryType === 'domicilio'}
                        onChange={() => setDeliveryType('domicilio')}
                        className="form-radio text-rose-600"
                      />
                      <span className="ml-2 text-gray-300">Servicio a Domicilio (Costo Extra)</span>
                    </label>
                  </div>
                </div>

                {deliveryType === 'domicilio' && (
                  <div className="space-y-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-200">Detalles de la Ubicación:</h3>
                    <div>
                      <label htmlFor="street" className="block text-gray-300 text-sm mb-1">Calle:</label>
                      <input
                        type="text"
                        id="street"
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-rose-500"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      />
                      {formErrors.street && <p className="text-red-400 text-xs mt-1">{formErrors.street}</p>}
                    </div>
                    <div>
                      <label htmlFor="number" className="block text-gray-300 text-sm mb-1">Número:</label>
                      <input
                        type="text"
                        id="number"
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-rose-500"
                        value={address.number}
                        onChange={(e) => setAddress({ ...address, number: e.target.value })}
                      />
                      {formErrors.number && <p className="text-red-400 text-xs mt-1">{formErrors.number}</p>}
                    </div>
                    <div>
                      <label htmlFor="colony" className="block text-gray-300 text-sm mb-1">Colonia:</label>
                      <input
                        type="text"
                        id="colony"
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-rose-500"
                        value={address.colony}
                        onChange={(e) => setAddress({ ...address, colony: e.target.value })}
                      />
                      {formErrors.colony && <p className="text-red-400 text-xs mt-1">{formErrors.colony}</p>}
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-gray-300 text-sm mb-1">Ciudad:</label>
                      <input
                        type="text"
                        id="city"
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-rose-500"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      />
                      {formErrors.city && <p className="text-red-400 text-xs mt-1">{formErrors.city}</p>}
                    </div>
                    <div>
                      <label htmlFor="references" className="block text-gray-300 text-sm mb-1">Referencias de la Fachada:</label>
                      <textarea
                        id="references"
                        rows={3}
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-rose-500"
                        value={address.references}
                        onChange={(e) => setAddress({ ...address, references: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="notes" className="block text-gray-300 text-sm font-bold mb-2">Notas Adicionales:</label>
                  <textarea
                    id="notes"
                    rows={3}
                    className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-rose-500"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-800 hover:bg-rose-700 text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors"
                >
                  Finalizar Compra
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}