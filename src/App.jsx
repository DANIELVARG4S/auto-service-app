import { Routes, Route, Link, Navigate } from "react-router-dom";
import {Login} from "./pages/login/Login"
import { Register } from "./pages/register/Register";
import { Dashboard } from "./pages/dashboard/Dashboard";

function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Privada */}
      <Route path="/dashboard/*" element={<Dashboard />} />

      {/* Redirección */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;