import React from 'react'

export const Usuarios = () => {

  const usuarios = [
    {
      nombre: "Juan",
      apellidoPaterno: "Pérez",
      apellidoMaterno: "García",
      correo: "juan@gmail.com",
      telefono: "2221234567"
    },
    {
      nombre: "Ana",
      apellidoPaterno: "López",
      apellidoMaterno: "Martínez",
      correo: "ana@gmail.com",
      telefono: "2229876543"
    }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-700">
            Usuarios
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            
            <thead className="bg-gray-800 text-white sticky top-0">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Apellido Paterno</th>
                <th className="px-4 py-3">Apellido Materno</th>
                <th className="px-4 py-3">Correo</th>
                <th className="px-4 py-3">Teléfono</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map((usuario, index) => (
                <tr 
                  key={index}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-3">{usuario.nombre}</td>
                  <td className="px-4 py-3">{usuario.apellidoPaterno}</td>
                  <td className="px-4 py-3">{usuario.apellidoMaterno}</td>
                  <td className="px-4 py-3">{usuario.correo}</td>
                  <td className="px-4 py-3">{usuario.telefono}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};
