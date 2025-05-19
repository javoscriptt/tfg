"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { auth, db } from "@/firebase/config";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

    const iniciarSesion = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Primero autenticamos
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Luego verificamos/creamos el documento del usuario
      const userDoc = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(userDoc);

      if (!docSnap.exists()) {
        // Crear documento de usuario si no existe
        await setDoc(userDoc, {
          email: user.email,
          rol: "cliente",
          creado: new Date()
        });
        await router.push("/");
      } else {
        const userData = docSnap.data();
        await router.push(userData.rol === "admin" ? "/gestion" : "/");
      }
    } catch (error: any) {
      console.error("Error completo:", error); // Para debugging
      if (error.code === 'auth/invalid-email') {
        setError("El correo electrónico no es válido");
      } else if (error.code === 'auth/user-not-found') {
        setError("Usuario no encontrado");
      } else if (error.code === 'auth/wrong-password') {
        setError("Contraseña incorrecta");
      } else {
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
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
          disabled={loading}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />

        <button 
          type="submit" 
          className="bg-indigo-600 text-white w-full py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Iniciando sesión..." : "Entrar"}
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </main>
  );
}