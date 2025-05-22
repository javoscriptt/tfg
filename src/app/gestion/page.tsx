"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { 
  collection, 
  getDocs, 
  getDoc,  
  doc,    
  orderBy, 
  query 
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Pedido {
  id: string;
  correoUsuario: string;
  productos: Array<{
    id: string;
    nombre: string;
    cantidad: number;
    precio: number;
    urlImagen?: string;
  }>;
  fechaCreacion: any;
  total: number;
}

export default function GestionPage() {
  const [cargando, setCargando] = useState(true);
  const [esAdmin, setEsAdmin] = useState(false);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const router = useRouter();

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const q = query(collection(db, "pedidos"), orderBy("fechaCreacion", "desc"));
        const querySnapshot = await getDocs(q);
        const pedidosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Pedido[];
        setPedidos(pedidosData);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().rol === "admin") {
          setEsAdmin(true);
          cargarPedidos();
        } else {
          router.push("/");
        }
      } else {
        router.push("/login");
      }
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  if (cargando) return <p className="p-6 text-center">Cargando...</p>;
  if (!esAdmin) return null;

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Panel de gestión</h1>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Pedidos recientes</h2>
        
        <div className="space-y-6">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-semibold">Cliente: {pedido.correoUsuario}</p>
                  <p className="text-sm text-gray-600">
                    Fecha: {new Date(pedido.fechaCreacion.seconds * 1000).toLocaleString()}
                  </p>
                </div>
                <p className="font-bold">Total: {pedido.total}€</p>
              </div>

              <div className="space-y-3">
                {pedido.productos.map((producto, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    {producto.urlImagen && (
                      <div className="relative w-24 h-24">
                        <img
                          src={producto.urlImagen}
                          alt={producto.nombre}
                          className="rounded-lg object-cover"
                          width={96}
                          height={96}
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{producto.nombre}</p>
                      <p className="text-sm text-gray-600">
                        Cantidad: {producto.cantidad} x {producto.precio}€
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {pedidos.length === 0 && (
            <p className="text-center text-gray-500">No hay pedidos todavía</p>
          )}
        </div>
      </div>
    </main>
  );
}