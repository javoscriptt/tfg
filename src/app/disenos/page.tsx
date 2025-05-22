"use client";

import Image from 'next/image';

export default function DisenosPage() {
  const disenos = [
    { id: 1, imagen: '/images/diseno1.png', titulo: 'Diseño 1' },
    { id: 2, imagen: '/images/diseno2.png', titulo: 'Diseño 2' },
    { id: 3, imagen: '/images/diseno3.png', titulo: 'Diseño 3' },
    { id: 4, imagen: '/images/diseno4.png', titulo: 'Diseño 4' },
  ];

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-10">Nuestros Diseños</h1>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {disenos.map((diseno) => (
          <div key={diseno.id} className="flex flex-col items-center">
            <div className="relative w-full h-64 mb-4">
              <Image
                src={diseno.imagen}
                alt={diseno.titulo}
                fill
                className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{diseno.titulo}</h3>
          </div>
        ))}
      </div>
    </main>
  );
}