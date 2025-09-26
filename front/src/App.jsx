import { Routes, Route } from "react-router-dom";
import Listado from "./pages/Listado";
import Agregar from "./pages/Agregar";
import Editar from "./pages/Editar";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Listado />} />
        <Route path="/productos/agregar" element={<Agregar />} />
        <Route path="/editar/:id" element={<Editar />} />
      </Routes>
  );
}