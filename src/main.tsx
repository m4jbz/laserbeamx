import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // IMPORTANTE
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './app/App.tsx'
import './styles/index.css'

import { AuthProvider } from './app/context/AuthContext'
import { CartProvider } from './app/context/CartContext'
import { ClientAuthProvider } from './app/context/ClientAuthContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ClientAuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ClientAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
