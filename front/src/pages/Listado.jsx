import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Listado() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  const obtenerProductos = async () => {
    try {
      const res = await api.get("/productos");
      setProductos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await api.delete(`/productos/${id}`);
      setProductos(productos.filter((p) => p.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <div className="container mx-auto p-8">
      {/* Título y botón Agregar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Listado de Productos</h1>
        <button
          onClick={() => navigate("/productos/agregar")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
        >
          Agregar Producto
        </button>
      </div>

      {/* Contenedor de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productos.map((p) => (
          <div
            key={p.id}
            className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl duration-300"
          >
            {/* Información del Producto */}
            <h2 className="text-xl font-semibold text-gray-800">{p.name}</h2>
            <p className="text-gray-600 mt-2">Precio: <span className="font-semibold text-blue-600">${p.price}</span></p>
            <p className="text-gray-600">Stock: <span className="font-semibold">{p.stock} unidades</span></p>

            {/* Botones de Acción */}
            <div className="mt-6 flex justify-between gap-4">
              <button
                onClick={() => navigate(`/editar/${p.id}`)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md transition-all duration-200"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarProducto(p.id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-all duration-200"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}