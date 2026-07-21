import { useEffect, useState } from "react";
import client from "../api/client";

interface User {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string;
  email: string;
  password: string;
  telefono: string;
  rol_id: number;
}

export const useCurrentUser = () => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        // Intenta obtener el usuario actual del endpoint /auth/me o /users/current
        // Cambia la ruta según tu backend
        const response = await client.get<User>("/auth/me");
        
        console.log("Usuario autenticado:", response.data);
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error al obtener usuario autenticado:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return { data, loading, error };
};
