import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // IMPORTANTE
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./app/App.tsx";
import "./styles/index.css";

import { AuthProvider } from "./app/context/AuthContext";
import { CartProvider } from "./app/context/CartContext";
import { OrderProvider } from "./app/context/OrderContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter> {/* ENVUELVE TODO */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);