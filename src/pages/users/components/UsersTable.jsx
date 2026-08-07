import React from 'react';

export const UsersTable = ({ users, onEdit }) => {
  return (
    <div className="max-h-145 overflow-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-800 text-white sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Apellido Paterno</th>
            <th className="px-4 py-3">Apellido Materno</th>
            <th className="px-4 py-3">Correo</th>
            <th className="px-4 py-3">Teléfono</th>
            <th className="px-4 py-3">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.map((usuario, index) => (
            <tr key={usuario.id || index} className="border-b hover:bg-gray-100 transition">
              <td className="px-4 py-3">{usuario.nombre}</td>
              <td className="px-4 py-3">{usuario.apellido_paterno}</td>
              <td className="px-4 py-3">{usuario.apellido_materno}</td>
              <td className="px-4 py-3">{usuario.email}</td>
              <td className="px-4 py-3">{usuario.telefono}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onEdit(usuario)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
