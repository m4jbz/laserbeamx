import { useEffect } from "react"; 
import { Outlet, useLocation } from "react-router"; 
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();  // Obtiene la ruta actual

  // cambia y sube el scroll
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}