"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { servicioPedidos } from "@/servicios/servicioPedidos";
import { Pedido } from "@/tipos/pedido";
import Image from "next/image";

export default function PerfilPage() {
  const [usuarioEmail, setUsuarioEmail] = useState<string | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Usuario autenticado:", user.uid);
        setUsuarioEmail(user.email);
        try {
          const pedidosUsuario = await servicioPedidos.obtenerPedidosUsuario(user.uid);
          console.log("Pedidos obtenidos:", pedidosUsuario);
          setPedidos(pedidosUsuario);
        } catch (error) {
          console.error("Error detallado:", error);
        }
      } else {
        setUsuarioEmail(null);
        setPedidos([]);
      }
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  const recargarPedidos = async () => {
    if (!auth.currentUser) return;
    setCargando(true);
    try {
      const pedidosUsuario = await servicioPedidos.obtenerPedidosUsuario(auth.currentUser.uid);
      setPedidos(pedidosUsuario);
    } catch (error) {
      console.error("Error al recargar pedidos:", error);
    }
    setCargando(false);
  };

  if (cargando) {
    return <div className="p-6 text-center">Cargando...</div>;
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Mi perfil</h1>

      {usuarioEmail ? (
        <>
          <p className="text-center mb-6">
            Sesión iniciada como <strong>{usuarioEmail}</strong>
          </p>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Mis pedidos</h2>
              <button 
                onClick={recargarPedidos}
                className="text-blue-500 hover:text-blue-700"
              >
                Recargar
              </button>
            </div>

            {pedidos.length > 0 ? (
              <div className="space-y-6">
                {pedidos.map((pedido) => (
                  <div key={pedido.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          Fecha: {new Date(pedido.fechaCreacion.seconds * 1000).toLocaleString()}
                        </p>
                        <p className="font-bold mt-1">Total: {pedido.total}€</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {pedido.productos.map((producto, index) => (
                        <div key={index} className="flex items-center space-x-4 border-t pt-4">
                          {producto.imagenPersonalizada && (
                            <div className="relative w-20 h-20">
                              <Image
                                src={producto.imagenPersonalizada}
                                alt="Diseño personalizado"
                                fill
                                className="object-cover rounded-lg"
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
              </div>
            ) : (
              <p className="text-gray-600">Aún no has realizado ningún pedido.</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-red-600">
          Debes iniciar sesión para ver tu perfil.
        </p>
      )}
    </main>
  );
}