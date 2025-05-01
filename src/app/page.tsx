import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen p-6">
      <section className="max-w-4xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-6 text-center">¿Quiénes somos?</h1>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <p className="text-lg mb-6 text-center md:w-1/2">
            Somos especialistas en personalización de objetos como tazas, camisetas,
            chapas y vinilos para motos. Utilizamos impresión láser y serigrafía
            para dar vida a tus ideas.
          </p>
          <div className="relative w-full md:w-1/2 h-64">
            <Image
              src="/images/quienes-somos.jpg"
              alt="Taller de diseño"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-center">Diseños destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            title="Taza"
            image="/images/taza.png"
            description="Diseño personalizado para tazas"
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
            title="Puerta"
            image="/images/puerta.png"
            description="Vinilos decorativos para puertas"
          />
        </div>
      </section>
    </main>
  );
}

interface ProductCardProps {
  title: string;
  image: string;
  description: string;
}

function ProductCard({ title, image, description }: ProductCardProps) {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-xl transition-transform hover:scale-105">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="relative w-full h-48 mb-4">
        <Image
          src={image}
          alt={`Diseño de ${title}`}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <p className="text-center text-gray-600">{description}</p>
    </div>
  );
}