export const Table = () => {

    return(
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-700">
                        Mantenimientos
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
    
                        <thead className="bg-gray-800 text-white sticky top-0">
                            <tr>
                                <th className="px-4 py-3">Vehiculo</th>
                                <th className="px-4 py-3">Tipo de Mantenimiento</th>
                                <th className="px-4 py-3">Fecha</th>
                                <th className="px-4 py-3">Kilometraje</th>
                                <th className="px-4 py-3">Descripcion</th>
                                <th className="px-4 py-3">Costo</th>
                                <th className="px-4 py-3">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <td className="px-4 py-3"></td>
                            <td className="px-4 py-3"></td>
                            <td className="px-4 py-3"></td>
                            <td className="px-4 py-3"></td>
                            <td className="px-4 py-3"></td>
                            <td className="px-4 py-3"></td>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}