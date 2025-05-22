export interface Pedido {
  id?: string;
  usuarioId: string;
  correoUsuario: string;
  productos: ProductoPedido[];
  total: number;
  fechaCreacion: Date;
}

export interface ProductoPedido {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  personalizacion?: string;
  urlImagen?: string;
  imagenPersonalizada?: string;
}