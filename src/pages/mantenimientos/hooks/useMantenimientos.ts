import { useEffect, useState } from "react";
import client from "../../../api/client";

interface Mantenimientos {
    vehiculo_Id: number;
    tipo_Mantenimiento: string;
    fecha: string;
    kilometraje: number;
    descripcion: string;
    costo: number;
    proximo_servicio_km: number;
    proximo_servicio_fecha: string;
}

export const useMantenimientos = () => {

    const [mantenimientos, setMantenimientos] = useState<Mantenimientos[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect( () => {
            const fetchMantenimientos = async () => {
                try {
                    setLoading(true);
                    const response = await client.get<Mantenimientos[]>("/maintenance/");
                    setMantenimientos(response.data);

                }catch (err) {
                    console.error("Error al conectar con la API:", err)
                    setError(err);
                }finally {
                    setLoading(false);
                }
            }
            fetchMantenimientos();
        }, []);
    return { mantenimientos, loading, error };
}