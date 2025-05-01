"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export default function PerfilPage() {
  const [usuarioEmail, setUsuarioEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuarioEmail(user.email);
      } else {
        setUsuarioEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Mi perfil</h1>

      {usuarioEmail ? (
        <>
          <p className="text-center mb-6">Sesión iniciada como <strong>{usuarioEmail}</strong></p>

          <div className="bg-gray-100 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Mis pedidos</h2>
            <p>Aquí verás tus pedidos una vez estén disponibles.</p>
            {/* Más adelante: aquí insertamos pedidos desde Firestore */}
          </div>
        </>
      ) : (
        <p className="text-center text-red-600">No has iniciado sesión.</p>
      )}
    </main>
  );
}
