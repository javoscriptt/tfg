export interface Pedido {
    id?: string;
    usuarioId: string;
    correoUsuario: string;
    productos: ProductoPedido[];
    total: number;
    estado: 'pendiente' | 'procesando' | 'completado' | 'cancelado';
    fechaCreacion: Date;
    direccionEnvio?: {
      calle: string;
      ciudad: string;
      codigoPostal: string;
      pais: string;
    };
  }
  
  export interface ProductoPedido {
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
    personalizacion?: string;
    urlImagen?: string;
  }