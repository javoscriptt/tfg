"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const [perfilAbierto, setPerfilAbierto] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });

    return () => unsubscribe();
  }, []);

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      setPerfilAbierto(false);
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md p-4 fixed w-full top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-16">{/* Espacio para equilibrar el centro */}</div>
        
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Diseños Javi's
        </h1>

        <div className="relative w-16 flex justify-end">
          <button 
            onClick={() => setPerfilAbierto(!perfilAbierto)} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
          </button>

          {/* Menú desplegable de perfil */}
          {perfilAbierto && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg py-2 z-50">
              {usuario ? (
                <>
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm text-gray-600">{usuario.email}</p>
                  </div>
                  <Link 
                    href="/perfil" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setPerfilAbierto(false)}
                  >
                    Mi Perfil
                  </Link>
                  <button
                    onClick={cerrarSesion}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setPerfilAbierto(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link 
                    href="/registro" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setPerfilAbierto(false)}
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}