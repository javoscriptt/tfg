'use client';
import Image from 'next/image';

export default function DisenosPage() {
  const disenos = [
    { 
      id: 1, 
      imagen: '/images/diseno1.png', 
      imagenAmpliada: '/images/diseno11.png',
      titulo: 'Cantimplora en metal',
      historia: 'Esta cantimplora fue uno de nuestros primeros pedidos y más importantes, nos lo pidió Miguel y nos especificó que era para un torneo de fútbol que tenía. Días después de eso nos llamó ilusionado diciendo que estaba convencido de que la cantimplora le había dado suerte y ganó el torneo.'
    },
    { 
      id: 2, 
      imagen: '/images/diseno2.png', 
      imagenAmpliada: '/images/diseno21.png',
      titulo: 'Llavero de madera ',
      historia: 'Este llavero fue diseñado para Diana y Gabriel (dg) que celebraba su 5º aniversario. Nos pidieron que hicieramos este diseño con madera de un roble muy antiguo que tenian en su casa y se veian obligados a talar. Nos contaron que cada vez que miran el llavero les vienen recuerdos de todo el tiempo que pasaban bajo la sombr de aquel Roble.'
    },
    { 
      id: 3, 
      imagen: '/images/diseno3.png', 
      imagenAmpliada: '/images/diseno31.png',
      titulo: 'Vinilo "Stake',
      historia: 'Estas pegatinas las creamos para una nueva cafetería que abría en el centro de Madrid y querian que con cada compra que hicieran los clientes regalarles ese pequeño detalle de la marca tambien para hacerse algo de publicidad. Ahora vemos nuestras propias pegatinas por todos lados.'
    },
    { 
      id: 4, 
      imagen: '/images/diseno4.png', 
      imagenAmpliada: '/images/diseno41.png',
      titulo: 'Cartera grabada en piel',
      historia: 'Esta cartera fue un encargo especial de una hija para el cumpleaños de su madre Nuria. El diseño de corazones representa el amor entre ellas. La madre la lleva siempre consigo y dice que cada vez que la abre recuerda el momento en que su hija se la regaló.'
    },
  ];

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-10">Nuestros Diseños</h1>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {disenos.map((diseno) => (
          <div key={diseno.id} className="flex flex-col items-center bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
            <div className="relative w-full h-64 mb-4">
              <Image
                src={diseno.imagen}
                alt={diseno.titulo}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">{diseno.titulo}</h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              {diseno.historia}
            </p>
            <div className="relative w-full h-48 mt-2">
              <Image
                src={diseno.imagenAmpliada}
                alt={`${diseno.titulo} - Detalle`}
                fill
                className="object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}