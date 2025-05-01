"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function GestionPage() {
  const [cargando, setCargando] = useState(true);
  const [esAdmin, setEsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ref = doc(db, "usuarios", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists() && snap.data().rol === "admin") {
          setEsAdmin(true);
        } else {
          router.push("/"); // redirige si no es admin
        }
      } else {
        router.push("/login"); // redirige si no hay sesión
      }

      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  if (cargando) return <p className="p-6 text-center">Cargando...</p>;

  if (!esAdmin) return null; // por si acaso

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Panel de gestión</h1>

      <section className="bg-gray-100 p-4 rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">Pedidos recientes</h2>
        <p>Aquí irán todos los pedidos (cuando los conectemos con Firestore).</p>
      </section>

      <section className="bg-gray-100 p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">Estadísticas</h2>
        <p>En esta sección mostraremos gráficos con ventas y productos más pedidos.</p>
      </section>
    </main>
  );
}
