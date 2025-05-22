import { useState } from 'react';
import Image from 'next/image';

interface Props {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number | null;
  imagen: string;
  onAgregarAlCarrito: (imagenPersonalizada: string | null) => void;
}

export default function TarjetaProducto({
  id,
  nombre,
  descripcion,
  precio,
  imagen,
  onAgregarAlCarrito
}: Props) {
  const [imagenSubida, setImagenSubida] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imagenSubida) {
      const nombreArchivo = imagenSubida.name;
      onAgregarAlCarrito(nombreArchivo);
    } else {
      onAgregarAlCarrito(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col">
      <img src={imagen} alt={nombre} className="w-full h-40 object-cover rounded-xl mb-3" />
      <h2 className="text-xl font-semibold">{nombre}</h2>
      <p className="text-sm text-gray-600">{descripcion}</p>
      <p className="text-lg font-bold my-2">
        {precio ? `${precio} € Aprox.` : "Precio a consultar"}
      </p>

      <form onSubmit={handleSubmit} className="mt-auto space-y-2">
        <label className="block text-sm">
          Imagen para personalizar:
          <input
            type="file"
            accept=".png"
            onChange={(e) => setImagenSubida(e.target.files?.[0] || null)}
            className="block mt-1 w-full"
          />
        </label>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl w-full hover:bg-indigo-700"
        >
          Agregar al carrito
        </button>
      </form>
    </div>
  );
}