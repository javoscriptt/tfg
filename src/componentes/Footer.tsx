export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-10">
      <div className="flex justify-center gap-4 mb-2">
        {/* Iconos de redes sociales */}
        <a href="#" className="text-gray-500 hover:text-gray-700">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="text-gray-500 hover:text-gray-700">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="text-gray-500 hover:text-gray-700">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      <p className="text-sm">© 2025 Diseños Javi’s</p>
    </footer>
  );
}