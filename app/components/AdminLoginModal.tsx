import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AdminLoginModal({ onClose }: { onClose: () => void }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'admin' && pass === 'pollos123') { 
      login('token-de-acceso');
      onClose();
      window.location.href = '/admin';
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[999]">
      <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-lg border border-rose-800 w-full max-w-sm">
        <h2 className="text-white text-2xl mb-6 font-bold text-center">Panel Administrativo</h2>
        <input type="text" placeholder="Usuario" className="w-full p-3 mb-4 bg-gray-800 text-white rounded border border-gray-700" onChange={e => setUser(e.target.value)} />
        <input type="password" placeholder="Contraseña" className="w-full p-3 mb-6 bg-gray-800 text-white rounded border border-gray-700" onChange={e => setPass(e.target.value)} />
        <button className="w-full bg-rose-800 text-white py-3 rounded-lg font-bold hover:bg-rose-700 transition-colors">Entrar</button>
        <button type="button" onClick={onClose} className="w-full text-gray-500 mt-4 text-sm">Cerrar</button>
      </form>
    </div>
  );
}
