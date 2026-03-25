import { useState, useEffect } from 'react';
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useAuth } from './context/AuthContext';
import AdminLoginModal from './components/AdminLoginModal';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F11' && !isAuthenticated) {
        e.preventDefault();
        setShowLogin(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated]);

  return (
    <>
      <RouterProvider router={router} />
      {showLogin && <AdminLoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}
