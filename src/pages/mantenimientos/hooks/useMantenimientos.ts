import { useEffect, useState } from "react";
import client from "../../../api/client";

interface Mantenimientos {
    id: number;
    vehiculo_id: number;
    tipo_mantenimiento_id: number;
    fecha: Date;
    kilometraje: number;
    descripcion: string;
    costo: number;
    proximo_servicio_km: number;
    proximo_servicio_fecha: Date;
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
                    // console.log("Datos obtenidos de la API:", response.data);   
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