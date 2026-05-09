import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from './CartContext';

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  paymentMethod: 'transferencia';
  deliveryType: 'local' | 'domicilio';
  address: {
    street: string;
    number: string;
    colony: string;
    city: string;
    references: string;
  } | null;
  notes: string;
  cartItems: { id: number; name: string; quantity: number; price: number }[];
  total: number;
  date: string;
  estado: 'Pendiente' | 'Enviado' | 'Cancelado';
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'estado'>) => void;
  updateOrderStatus: (orderId: string, newStatus: 'Pendiente' | 'Enviado' | 'Cancelado') => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const localData = localStorage.getItem('orders');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Error parsing orders from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrder: Omit<Order, 'id' | 'estado'>) => {
    const orderWithIdAndStatus: Order = {
      ...newOrder,
      id: `ORD-${Date.now()}`,
      estado: 'Pendiente',
    };
    setOrders((prevOrders) => [...prevOrders, orderWithIdAndStatus]);
  };

  const updateOrderStatus = (orderId: string, newStatus: 'Pendiente' | 'Enviado' | 'Cancelado') => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, estado: newStatus } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};