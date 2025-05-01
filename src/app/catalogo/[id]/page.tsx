import { productos } from "@/data/productos";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default function ProductoPersonalizar({ params }: Props) {
  const producto = productos.find((p) => p.id === parseInt(params.id));

  if (!producto) return notFound();

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Personalizar: {producto.nombre}</h1>
      <img src={producto.imagen} alt={producto.nombre} className="w-full h-60 object-cover rounded-xl mb-4" />
      <p className="mb-2">{producto.descripcion}</p>
      <p className="font-bold mb-4">Precio: {producto.precio} €</p>

      <form className="space-y-4">
        <label className="block">
          Subir imagen de diseño:
          <input type="file" accept="image/*" className="mt-1 block w-full" />
        </label>

        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-xl">
          Hacer pedido
        </button>
      </form>
    </main>
  );
}
