"use client";

import { useState } from "react";
import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const registrarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const credenciales = await createUserWithEmailAndPassword(auth, email, password);
      const uid = credenciales.user.uid;

      // Guardar en Firestore con rol "usuario"
      await setDoc(doc(db, "usuarios", uid), {
        email,
        rol: "usuario",
        creado: new Date(),
      });

      router.push("/perfil"); // Redirige al panel de usuario
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Registro</h1>

      <form onSubmit={registrarUsuario} className="space-y-4">
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

        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">
          Registrarse
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </main>
  );
}
