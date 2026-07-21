import { Link, Routes, Route } from "react-router-dom";
import { Login } from "../login/Login";
import { Vehiculos } from "../vehiculos/Vehiculos";
import { Mantenimientos } from "../mantenimientos/Mantenimientos";
import { Usuarios } from "../users/Usuarios";
import { PerfilUsuario } from "../user/PerfilUsuario";


export const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-bold mb-6">🚗 Mi garaje</h2>

        <nav className="flex flex-col gap-3">
          <Link to="/dashboard" className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Vehículos</Link>
          <Link to="/dashboard/mantenimientos" className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Mantenimientos</Link>
          <Link to="/dashboard/user" className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Mi Perfil</Link>
          <Link to="/dashboard/users" className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Usuarios</Link>
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
            <Route path="/" element={<Vehiculos />} />
            <Route path="mantenimientos" element={<Mantenimientos />} />
            <Route path="/user" element={<PerfilUsuario />} />
            <Route path="/users" element={<Usuarios />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
