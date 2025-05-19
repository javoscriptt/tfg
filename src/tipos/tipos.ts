export interface SolicitudPersonalizacion {
    id?: string;
    usuarioId: string;
    email: string;
    productoId: number;
    nombreProducto: string;
    imagenURL: string;
    estado: 'pendiente' | 'procesando' | 'completado';
    fecha: Date;
  }