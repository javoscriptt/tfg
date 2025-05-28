'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/config';
import { servicioPedidos } from '@/servicios/servicioPedidos';
import { ProductoPedido } from '@/tipos/pedido';
import { productos } from '@/data/productos';
import TarjetaProducto from '@/componentes/TarjetaProducto';

export default function PaginaCatalogo() {
  const [carrito, setCarrito] = useState<ProductoPedido[]>([]);
  const [cargando, setCargando] = useState(false);
  const router = useRouter();

  const agregarAlCarrito = (producto: any, imagenPersonalizada: string | null) => {
    setCarrito(carritoActual => {
      const productoExistente = carritoActual.find(p => p.id === producto.id);
      if (productoExistente) {
        return carritoActual.map(p =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...carritoActual, {
        ...producto,
        cantidad: 1,
        imagenPersonalizada: imagenPersonalizada || undefined
      }];
    });
  };

  const realizarPedido = async () => {
    if (!auth.currentUser) {
      router.push('/login');
      return;
    }

    setCargando(true);
    try {
      await servicioPedidos.crearPedido({
        usuarioId: auth.currentUser.uid,
        correoUsuario: auth.currentUser.email || '',
        productos: carrito,
        total: carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
        fechaCreacion: new Date()
      });

      setCarrito([]);
      alert('¡Pedido realizado con éxito! Contactaremos contigo pronto.');
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      alert('Debes insertar una imagen PNG del producto que quieres personalizar.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Catálogo</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <TarjetaProducto
            key={producto.id}
            {...producto}
            onAgregarAlCarrito={(imagenPersonalizada) => agregarAlCarrito({
              id: producto.id.toString(),
              nombre: producto.nombre,
              precio: producto.precio || 0,
              cantidad: 1,
              urlImagen: producto.imagen
            }, imagenPersonalizada)}
          />
        ))}
      </div>

      {carrito.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-2">Carrito</h2>
          <ul className="mb-4">
            {carrito.map(item => (
              <li key={item.id} className="flex justify-between">
                <span>{item.nombre} x {item.cantidad}</span>
                <span>{(item.precio * item.cantidad).toFixed(2)}€</span>
              </li>
            ))}
          </ul>
          <button
            onClick={realizarPedido}
            disabled={cargando}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {cargando ? 'Procesando...' : 'Realizar Pedido'}
          </button>
        </div>
      )}
    </div>
  );
}