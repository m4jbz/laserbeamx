import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // IMPORTANTE
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./app/App.tsx";
import "./styles/index.css";

import { AuthProvider } from "./app/context/AuthContext";
import { CartProvider } from "./app/context/CartContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter> {/* ENVUELVE TODO */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);