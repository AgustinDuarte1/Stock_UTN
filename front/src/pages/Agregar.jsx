import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Agregar() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/productos", { name: nombre, price: parseFloat(precio), stock: parseInt(stock) });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Agregar Producto</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold">Nombre del Producto</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingrese el nombre del producto"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold">Precio</label>
          <input
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            type="number"
            step="0.01"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingrese el precio"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold">Stock</label>
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            type="number"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Ingrese la cantidad de stock"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 text-white bg-gray-400 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Agregar Producto
          </button>
        </div>
      </form>
    </div>
  );
}