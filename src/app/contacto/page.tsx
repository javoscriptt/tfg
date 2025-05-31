"use client";

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const ContactoPage = () => {
  const mapStyles = {
    height: '400px',
    width: '100%'
  };

  const defaultCenter = {
    lat: 40.437849,
    lng: -3.716234
  };

  return (
    <main className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Contáctanos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Información de contacto */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Información</h2>
            <p className="mb-2"><strong>Dirección:</strong> C. de Joaquín María López, 62, Chamberí, 28015 Madrid</p>
            <p className="mb-2"><strong>Teléfono:</strong> (123) 456-7890</p>
            <p className="mb-2"><strong>Email:</strong> javierestebansanz5@gmail.com</p>
          </div>

          <div className="flex space-x-4">
            <a href="#" className="text-blue-500 hover:text-blue-700">Facebook</a>
            <a href="#" className="text-blue-500 hover:text-blue-700">Twitter</a>
            <a href="#" className="text-blue-500 hover:text-blue-700">Instagram</a>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Horario de atención</h2>
            <p className="mb-2">Lunes a Viernes: 9am - 6pm</p>
            <p className="mb-2">Sábados: 10am - 2pm</p>
            <p className="mb-2">Domingos: Cerrado</p>
          </div>
        </div>

        {/* Mapa de Google Maps */}
        <div>
          <LoadScript googleMapsApiKey="AIzaSyCtaf7Lz-8MS3W7UiG72Rd1tvrbePb5WoU">
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={13}
              center={defaultCenter}
            >
              <Marker position={defaultCenter} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      {/* Sección de imágenes */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Nuestro equipo, maquinaria e instalaciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <img src="/images/equipo.png" alt="Equipo" className="rounded-xl w-full h-64 object-cover" />
          <img src="/images/maquina.png" alt="Instalaciones" className="rounded-xl w-full h-64 object-cover" />
          <img src="/images/taller.png" alt="Taller" className="rounded-xl w-full h-64 object-cover" />
        </div>
      </div>
    </main>
  );
};

export default ContactoPage;