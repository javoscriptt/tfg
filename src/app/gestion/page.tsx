"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, getDoc, doc, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Producto {
  id: string;
  nombre: string;
  cantidad: number;
  precio: number;
  urlImagen?: string;
  imagenPersonalizada?: string;
}

interface Pedido {
  id: string;
  correoUsuario: string;
  productos: Producto[];
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
                    Fecha: {pedido.fechaCreacion?.toDate().toLocaleString()}
                  </p>
                </div>
                <p className="font-bold">Total: {pedido.total}€</p>
              </div>

              <div className="space-y-4">
                {pedido.productos.map((producto, index) => (
                  <div key={index} className="flex items-start space-x-4 border-t pt-4">
                    <div className="flex space-x-4">
                      {/* Imagen del producto original */}
                      {producto.urlImagen && (
                        <div className="relative w-24 h-24">
                          <Image
                            src={producto.urlImagen}
                            alt={producto.nombre}
                            width={96}
                            height={96}
                            className="rounded-lg object-cover"
                          />
                        </div>
                      )}
                      
                      {/* Imagen personalizada */}
                      {producto.imagenPersonalizada && (
                        <div className="relative w-24 h-24">
                          <Image
                            src={producto.imagenPersonalizada}
                            alt="Diseño personalizado"
                            width={96}
                            height={96}
                            className="rounded-lg object-cover border-2 border-blue-500"
                          />
                        </div>
                      )}
                      
                      <div>
                        <p className="font-medium">{producto.nombre}</p>
                        <p className="text-sm text-gray-600">
                          Cantidad: {producto.cantidad} x {producto.precio}€
                        </p>
                        {producto.imagenPersonalizada && (
                          <p className="text-sm text-blue-600">
                            Incluye diseño personalizado
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}