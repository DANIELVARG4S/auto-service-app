import React from 'react';

export const UserForm = ({ form, onChange, isCreating, onCancel }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <label className="block text-sm font-medium text-gray-800">
        Nombre
        <input
          type="text"
          value={form.nombre}
          onChange={(e) => onChange('nombre')(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
        />
      </label>

      <label className="block text-sm font-medium text-gray-800">
        Apellido paterno
        <input
          type="text"
          value={form.apellido_paterno}
          onChange={(e) => onChange('apellido_paterno')(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
        />
      </label>

      <label className="block text-sm font-medium text-gray-800">
        Apellido materno
        <input
          type="text"
          value={form.apellido_materno}
          onChange={(e) => onChange('apellido_materno')(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
        />
      </label>

      <label className="block text-sm font-medium text-gray-800">
        Correo
        <input
          type="email"
          value={form.email}
          onChange={(e) => onChange('email')(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
        />
      </label>

      <label className="block text-sm font-medium text-gray-800">
        Teléfono
        <input
          type="text"
          value={form.telefono}
          onChange={(e) => onChange('telefono')(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
        />
      </label>

      <label className="block text-sm font-medium text-gray-800">
        Tipo de usuario
        <select
          value={form.rol_id}
          onChange={(e) => onChange('rol_id')(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
        >
          <option value="">Seleccionar tipo de usuario</option>
          <option value={1}>Administrador</option>
          <option value={2}>Usuario</option>
        </select>
      </label>

      {isCreating ? (
        <>
          <label className="block text-sm font-medium text-gray-800">
            Contraseña
            <input
              type="password"
              value={form.password}
              onChange={(e) => onChange('password')(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
            />
          </label>

          <label className="block text-sm font-medium text-gray-800">
            Confirmar contraseña
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => onChange('confirmPassword')(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
            />
          </label>
        </>
      ) : (
        <label className="block text-sm font-medium text-gray-800">
          {/* Contraseña (opcional)
          <input
            type="password"
            value={form.password}
            onChange={(e) => onChange('password')(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
          /> */}
        </label>
      )}
    </div>
  );
};

export default UserForm;
