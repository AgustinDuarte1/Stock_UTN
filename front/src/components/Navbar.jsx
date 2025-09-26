import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-100 p-4 shadow-md flex items-center">
      <Link
        to="/productos"
        className="mr-6 text-gray-700 hover:text-gray-900 font-medium"
      >
        Listado
      </Link>
      <Link
        to="/productos/agregar"
        className="text-gray-700 hover:text-gray-900 font-medium"
      >
        Agregar
      </Link>
    </nav>
  );
}