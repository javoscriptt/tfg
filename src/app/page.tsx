'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProductCardProps {
  title: string;
  image: string;
  description: string;
}

function ProductCard({ title, image, description }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative">
      {/* GIF a pantalla completa */}
      <div className="fixed inset-0 w-full h-screen">
        <Image
          src="/gif.gif"
          alt="Background GIF"
          fill
          priority
          className="object-cover"
        />
        {/* Indicador de scroll */}
        <div className={`absolute left-1/2 bottom-8 transform -translate-x-1/2 text-white animate-bounce ${
          scrolled ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-500`}>
          <p className="text-center mb-2 text-shadow">Desliza hacia abajo</p>
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative min-h-screen">
        {/* Espaciador para el GIF */}
        <div className="h-screen" />
        
        {/* Contenido que aparece al hacer scroll */}
        <div className="bg-white">
          <section className="max-w-4xl mx-auto mb-12 pt-20 px-6">
            <h1 className="text-3xl font-bold mb-6 text-center">¿Quiénes somos?</h1>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <p className="text-lg mb-6 text-center md:w-1/2">
                Javier Esteban y Javer Blanco, Somos especialistas en personalización de objetos como tazas, camisetas,
                chapas y vinilos para motos. Utilizamos impresión láser y serigrafía
                para dar vida a tus ideas.
              </p>
              <div className="relative w-full md:w-1/2 h-64">
                <Image
                  src="/images/equipo.png"
                  alt="Taller de diseño"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-6 pb-12">
            <h2 className="text-2xl font-semibold mb-8 text-center">Diseños destacados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCard
                title="Lápiz"
                image="/images/lapiz.png"
                description="Diseño personalizado para material escolar"
              />
              <ProductCard
                title="Moto"
                image="/images/moto.png"
                description="Vinilos para motos a medida"
              />
              <ProductCard
                title="Llavero"
                image="/images/llavero.png"
                description="Llavero grabado con tu estilo"
              />
              <ProductCard
                title="Chapa para mascotas"
                image="/images/chapa.png"
                description="Chapa con el nombre e informacion de tu mascota"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}