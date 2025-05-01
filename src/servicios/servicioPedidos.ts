import { db } from '@/firebase/config';
import { collection, addDoc, doc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { Pedido } from '@/tipos/pedido';

export const servicioPedidos = {
  async crearPedido(pedido: Omit<Pedido, 'id'>): Promise<string> {
    try {
      const pedidoRef = await addDoc(collection(db, 'pedidos'), {
        ...pedido,
        fechaCreacion: new Date()
      });
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