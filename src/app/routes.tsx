import { createBrowserRouter, Navigate } from "react-router";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CustomOrders from "./pages/CustomOrders";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";

// 1. IMPORTAMOS EL NUEVO PANEL Y LA AUTENTICACIÓN
import AdminPanel from "./pages/AdminPanel";
import { useAuth } from "./context/AuthContext";

// 2. CREAMOS UN "GUARDIA" (COMPONENTE PROTECTOR)
// Este componente revisa si estás logueado. Si no, te manda al inicio.
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
  // 3. AÑADIMOS LA RUTA DE ADMINISTRACIÓN PROTEGIDA
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminPanel />
      </ProtectedRoute>
    ),
  },
]);
