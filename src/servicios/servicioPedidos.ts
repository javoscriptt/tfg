import { db } from '@/firebase/config';
import { collection, addDoc, doc, getDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { Pedido } from '@/tipos/pedido';

export const servicioPedidos = {
  async crearPedido(pedido: Omit<Pedido, 'id'>): Promise<string> {
  try {
    const pedidoParaGuardar = {
      ...pedido,
      productos: pedido.productos.map(p => ({
        ...p,
        urlImagen: p.urlImagen?.startsWith('/images/') ? p.urlImagen : `/images/${p.urlImagen}`,
        imagenPersonalizada: p.imagenPersonalizada ? `/images/${p.imagenPersonalizada}` : undefined
      })),
      fechaCreacion: Timestamp.now()
    };

    const pedidoRef = await addDoc(collection(db, 'pedidos'), pedidoParaGuardar);
    return pedidoRef.id;
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    throw new Error('No se pudo crear el pedido');
  }
},



  async obtenerPedidosUsuario(usuarioId: string): Promise<Pedido[]> {
    try {
      const q = query(
        collection(db, 'pedidos'),
        where('usuarioId', '==', usuarioId),
        orderBy('fechaCreacion', 'desc')
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Pedido[];
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
      throw new Error('No se pudieron obtener los pedidos');
    }
  }
};