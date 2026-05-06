import { Link, Routes, Route } from "react-router-dom";
import { Login } from "../login/Login";
import { Vehiculos } from "../Vehiculos";
import { Mantenimientos } from "../Mantenimientos";
import { Usuarios } from "../Usuarios";
import { PerfilUsuario } from "../PerfilUsuario";


export const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-bold mb-6">🚗 Mi garaje</h2>

        <nav className="flex flex-col gap-3">
          <Link to="/dashboard" className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Usuarios</Link>
          <Link to="/dashboard/vehiculos" className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Vehículos</Link>
          <Link to="/dashboard/mantenimientos" className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Mantenimientos</Link>
          <Link to="/dashboard/misDatos" className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Mi Perfil</Link>
          <Link to="/login" className="hover:text-yellow-400">Cerrar sesion</Link>
        </nav>
      </aside>

      {/* Contenido */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="bg-white p-4 shadow">
          Bienvenido, Usuario
        </header>

        {/* Vistas */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Usuarios />} />
            <Route path="vehiculos" element={<Vehiculos />} />
            <Route path="mantenimientos" element={<Mantenimientos />} />
            <Route path="misDatos" element={<PerfilUsuario />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
