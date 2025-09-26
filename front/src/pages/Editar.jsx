import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [cargando, setCargando] = useState(true);

  const obtenerProducto = async () => {
    try {
      const res = await api.get(`/productos/${id}`);
      setNombre(res.data.name);
      setPrecio(res.data.price.toString());
      setStock(res.data.stock.toString());
      setCargando(false);
    } catch (error) {
      console.log(error);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProducto();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/productos/${id}`, { 
        name: nombre, 
        price: parseFloat(precio), 
        stock: parseInt(stock) 
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (cargando) return <p className="text-center text-gray-500">Cargando producto...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Editar Producto</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold">Nuevo Nombre</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingrese el nuevo nombre"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold">Nuevo Precio</label>
          <input
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            type="number"
            step="0.01"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingrese el nuevo precio"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold">Nuevo Stock</label>
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            type="number"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingrese la nueva cantidad de stock"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 text-white bg-gray-400 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Salir
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}