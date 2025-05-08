"use client";
import Link from "next/link";
import { useState } from "react";

export default function MenuLateral() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setMenuAbierto(!menuAbierto)}
        className="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Menú"
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
            d="M4 6h16M4 12h16M4 18h16" 
          />
        </svg>
      </button>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity z-40
          ${menuAbierto ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setMenuAbierto(false)}
      />

      {/* Menú flotante */}
      <nav 
        className={`fixed top-1/2 left-8 -translate-y-1/2 w-64 bg-white/90 backdrop-blur-md 
          rounded-2xl shadow-2xl transform transition-all duration-300 z-50
          ${menuAbierto ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
      >
        {/* Cabecera del menú */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Menú
          </h2>
          <button
            onClick={() => setMenuAbierto(false)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
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
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>

        {/* Enlaces del menú */}
        <div className="p-4 space-y-2">
          {[
            { href: "/", label: "Inicio" },
            { href: "/catalogo", label: "Catálogo" },
            { href: "/disenos", label: "Diseños hasta la fecha" },
            { href: "/contacto", label: "Contacto" } // Agregado enlace a Contacto
          ].map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="block px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 
                transition-colors duration-200"
              onClick={() => setMenuAbierto(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}