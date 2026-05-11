import { Link, useLocation } from 'react-router'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { useClientAuth } from '../context/ClientAuthContext'
import ClientAuthModal from './ClientAuthModal'

export default function Header() {
  const { cartItems } = useCart()
  const location = useLocation()
  const { isAuthenticated, client } = useClientAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [clientModalOpen, setClientModalOpen] = useState(false)

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Ventas', path: '/shop' },
    { name: 'Órdenes personalizadas', path: '/custom-orders' },
    { name: 'Contactos', path: '/contact' },
    ...(isAuthenticated ? [{ name: 'Mis pedidos', path: '/mis-pedidos' }] : []),
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  // PRODUCTOS ÚNICOS
  const totalItems = new Set(cartItems.map((item) => item.id)).size

  return (
    <header className="sticky top-0 z-50 bg-[#0B0C14] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
              <img 
                src="https://codeberg.org/m4jbz/laserbeamx-images/raw/branch/main/kali.svg" 
                alt="Logo Laserbeamx" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-xl text-white group-hover:text-rose-400 transition-colors">
              Laserbeamx
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? "text-rose-400 font-medium"
                    : "text-gray-300 hover:text-rose-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">

            {/* Search Button - Mobile */}
            <button className="lg:hidden p-2 hover:bg-gray-800 rounded-full">
              <Search className="w-5 h-5 text-gray-300" />
            </button>

            {/* Cart */}
            <Link to="/checkout" className="relative p-2 hover:bg-gray-800 rounded-full">
              <ShoppingCart className="w-5 h-5 text-gray-300" />

              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User */}
            <button
              className="p-2 hover:bg-gray-800 rounded-full"
              onClick={() => setClientModalOpen(true)}
            >
              <User className="w-5 h-5 text-gray-300" />
            </button>
            {isAuthenticated && client?.name && (
              <button
                onClick={() => setClientModalOpen(true)}
                className="hidden sm:inline-flex items-center text-sm font-semibold text-gray-200 hover:text-rose-300"
              >
                {client.name.split(' ')[0]}
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 hover:bg-gray-800 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-rose-900/30 text-rose-400 font-medium'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      <ClientAuthModal open={clientModalOpen} onOpenChange={setClientModalOpen} />
    </header>
  )
}