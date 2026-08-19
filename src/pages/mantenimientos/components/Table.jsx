export const Table = ({ mantenimientos = [], onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-800 text-white sticky top-0">
          <tr>
            <th className="px-4 py-3">Vehículo</th>
            <th className="px-4 py-3">Tipo de Mantenimiento</th>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Kilometraje</th>
            <th className="px-4 py-3">Descripción</th>
            <th className="px-4 py-3">Costo</th>
            <th className="px-4 py-3">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {mantenimientos.length === 0 ? (
            <tr>
              <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                No hay mantenimientos registrados.
              </td>
            </tr>
          ) : (
            mantenimientos.map((mantenimiento) => (
              <tr key={mantenimiento.id ?? `${mantenimiento.vehiculo_Id}-${mantenimiento.fecha}`} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">{mantenimiento.vehiculo_Id ?? 'N/A'}</td>
                <td className="px-4 py-3">{mantenimiento.tipo_Mantenimiento ?? 'N/A'}</td>
                <td className="px-4 py-3">{mantenimiento.fecha ?? 'N/A'}</td>
                <td className="px-4 py-3">{mantenimiento.kilometraje ?? 'N/A'}</td>
                <td className="px-4 py-3">{mantenimiento.descripcion ?? 'Sin descripción'}</td>
                <td className="px-4 py-3">${Number(mantenimiento.costo ?? 0).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onEdit?.(mantenimiento)}
                    className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};