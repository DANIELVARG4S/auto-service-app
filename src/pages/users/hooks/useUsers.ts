import { useState, useEffect } from 'react';
import client from '../../../api/client';

interface User {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;  
  telefono: string;
}

export const useUsers = () => {
  // console.log("useUsers se ha ejecutado");
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await client.get<User[]>("/users/");
        
        console.log("Respuesta real de la API:", response.data);
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error al conectar con la API:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // 5. Ejecutamos la función
    fetchUsers();
  }, []); 
  return { data, loading, error };
};