
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from "./app/App.tsx";
import "./styles/index.css";
// 1. Importamos el AuthProvider que creaste en el paso anterior
import { AuthProvider } from './app/context/AuthContext';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    {/* 2. Envolvemos el componente <App /> con <AuthProvider> */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </QueryClientProvider>
);
