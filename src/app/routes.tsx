import { createBrowserRouter, Navigate } from "react-router";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CustomOrders from "./pages/CustomOrders";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";
import Checkout from "./pages/Checkout"; // Importar Checkout
import AdminPanel from "./pages/AdminPanel";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "custom-orders", Component: CustomOrders },
      { path: "contact", Component: Contact },
    ],
  },
  {
    path: "/checkout", // Nueva ruta para el checkout
    Component: Checkout,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminPanel />
      </ProtectedRoute>
    ),
  },
]);
