import { useEffect, useState } from "react";
import client from "../../../api/client";


interface   Vehiculo {
    id: number;
    marca: string;
    modelo: string;
    anio: number;
    color: string;
    placa: string;
    kilometraje: string;
}

export const useVehiculos = () => {

    const [data, setData] = useState<Vehiculo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {

        const fetchVehiculos = async () => {
            try {
                setLoading(true);
                const response = await client.get<Vehiculo[]>("/vehicles/");
                setData(response.data);
                setError(null);
            } catch (err) {
                console.error("Error al conectar con la API:", err);
                setError(err);
            } finally {
                setLoading(false);
            }   
        };

        fetchVehiculos();
    }, []);

    return { data, loading, error };
}