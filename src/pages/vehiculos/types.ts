import type { Usuario } from "../../types/usuario";

export type { Usuario } from "../../types/usuario";

export interface Vehiculo {
    id: number;
    usuario_id: number;
    marca: string;
    modelo: string;
    anio: number;
    color: string;
    placa: string;
    kilometraje: number;
    usuario?: Usuario;
}
