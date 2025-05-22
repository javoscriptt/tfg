import { db } from '@/firebase/config';
import { collection, addDoc, doc, getDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { Pedido } from '@/tipos/pedido';

export const servicioPedidos = {
  async crearPedido(pedido: Omit<Pedido, 'id'>): Promise<string> {
    try {
      // Crear el objeto del pedido con Timestamp de Firestore
      const pedidoParaGuardar = {
        usuarioId: pedido.usuarioId,
        correoUsuario: pedido.correoUsuario,
        productos: pedido.productos,
        total: pedido.total,
        fechaCreacion: Timestamp.now() // Cambiado a Timestamp de Firestore
      };

      // Crear el documento en la colección principal de pedidos
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