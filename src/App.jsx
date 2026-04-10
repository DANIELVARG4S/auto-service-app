import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 text-white flex gap-4 mb-4">
        <Link to="/login" className="hover:text-yellow-400">Login</Link>
        <Link to="/register" className="hover:text-yellow-400">Register</Link>
      </nav>

      <Routes>
        {/* Redirige la raíz a /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;