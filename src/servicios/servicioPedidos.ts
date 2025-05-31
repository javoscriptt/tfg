import { db } from '@/firebase/config';
import { collection, addDoc, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
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
      console.log('Buscando pedidos para usuario:', usuarioId);
      
      const pedidosRef = collection(db, 'pedidos');
      const q = query(
        pedidosRef, 
        where('usuarioId', '==', usuarioId),
        orderBy('fechaCreacion', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      console.log('Documentos encontrados:', querySnapshot.size);
      
      const pedidos: Pedido[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        pedidos.push({
          id: doc.id,
          usuarioId: data.usuarioId,
          correoUsuario: data.correoUsuario,
          productos: data.productos,
          total: data.total,
          fechaCreacion: data.fechaCreacion
        });
      });
      
      return pedidos;
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      throw error;
    }
  }
};