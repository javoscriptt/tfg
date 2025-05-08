"use client";

import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const ContactoPage = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario (ej: enviar un email)
    setEnviado(true);
    setNombre('');
    setEmail('');
    setMensaje('');
  };

  const mapStyles = {
    height: '300px',
    width: '100%'
  };

  const defaultCenter = {
    lat:  40.437849,  // Reemplaza con la latitud de tu ubicación
    lng: -3.716234 // Reemplaza con la longitud de tu ubicación
  };

  return (
    <main className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Contáctanos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulario de contacto */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Envíanos un mensaje</h2>
          {enviado ? (
            <p className="text-green-500">¡Mensaje enviado! Nos pondremos en contacto pronto.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-gray-700 text-sm font-bold mb-2">Mensaje:</label>
                <textarea
                  id="mensaje"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="4"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Enviar
              </button>
            </form>
          )}
        </div>

        {/* Información de contacto y mapa */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Información</h2>
          <p><strong>Dirección:</strong> C. de Joaquín María López, 62, Chamberí, 28015 Madrid</p>
          <p><strong>Teléfono:</strong> (123) 456-7890</p>
          <p><strong>Email:</strong> javierestebansanz5@gmail.com</p>
          <div className="flex space-x-4 mt-4">
            {/* Enlaces a redes sociales */}
            <a href="#" className="text-blue-500 hover:text-blue-700">Facebook</a>
            <a href="#" className="text-blue-500 hover:text-blue-700">Twitter</a>
            <a href="#" className="text-blue-500 hover:text-blue-700">Instagram</a>
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Horario de atención</h2>
          <p>Lunes a Viernes: 9am - 6pm</p>
          <p>Sábados: 10am - 2pm</p>
          <p>Domingos: Cerrado</p>

          {/* Mapa de Google Maps */}
          <div className="mt-6">
            <LoadScript
              googleMapsApiKey="AIzaSyCtaf7Lz-8MS3W7UiG72Rd1tvrbePb5WoU"  
            >
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
      </div>

      {/* Sección de imágenes/video */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Nuestro equipo y maquinaria</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Imágenes del taller, equipo y maquinaria */}
          <img src="/images/equipo.png" alt="Equipo" className="rounded-xl" />
          <img src="/images/maquina.png" alt="Instalaciones" className="rounded-xl" />
          <img src="/images/taller.png" alt="Taller" className="rounded-xl" />
        </div>
      </div>
    </main>
  );
};

export default ContactoPage;