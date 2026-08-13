import React from 'react'

export const VehiculosTable = ({ vehiculos, onEdit }) => {
  return (
    <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-800 text-white sticky top-0">
                <tr>
                    <th className="px-4 py-3">Marca</th>
                    <th className="px-4 py-3">Modelo</th>
                    <th className="px-4 py-3">Año</th>
                    <th className="px-4 py-3">Color</th>
                    <th className="px-4 py-3">Placa</th>
                    <th className="px-4 py-3">Kilometraje</th>
                    <th className="px-4 py-3">Opciones</th>
                </tr>
            </thead>
            <tbody>
                {vehiculos.map((vehiculo, index) => (
                    <tr
                        key={vehiculo.id || index}
                        className="border-b hover:bg-gray-100 transition"
                    >
                        <td className="px-4 py-3">{vehiculo.marca}</td>
                        <td className="px-4 py-3">{vehiculo.modelo}</td>
                        <td className="px-4 py-3">{vehiculo.anio ?? vehiculo.año}</td>
                        <td className="px-4 py-3">{vehiculo.color}</td>
                        <td className="px-4 py-3">{vehiculo.placa ?? vehiculo.placas}</td>
                        <td className="px-4 py-3">{vehiculo.kilometraje}</td>
                        <td className="px-4 py-3">
                            <button
                                onClick={() => onEdit(vehiculo)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Editar
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                                Activar/Desactivar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default VehiculosTable;