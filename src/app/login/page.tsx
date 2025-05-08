"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const iniciarSesion = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Autenticación con Firebase
      const credenciales = await signInWithEmailAndPassword(auth, email, password);
      const uid = credenciales.user.uid;

      // Buscar el rol del usuario en Firestore
      const docRef = doc(db, "usuarios", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const datos = docSnap.data();
        if (datos.rol === "admin") {
          router.push("/gestion");
        } else {
          router.push("/catalogo"); // Cambiar a /catalogo en lugar de /perfil
        }
      } else {
        // Si el documento no existe, créalo con rol "cliente"
        await setDoc(docRef, {
          email: credenciales.user.email,
          rol: "cliente",
          creado: new Date()
        });
        router.push("/catalogo"); // Redirigir al catálogo
      }
    } catch (err: any) {
      setError("Correo o contraseña incorrectos.");
    }
  };


  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h1>

      <form onSubmit={iniciarSesion} className="space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="bg-indigo-600 text-white w-full py-2 rounded">
          Entrar
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </main>
  );
}
