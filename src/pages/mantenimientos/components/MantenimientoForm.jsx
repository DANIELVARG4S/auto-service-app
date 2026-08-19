import React from 'react';

export const MantenimientoForm = ({ form = {}, onChange, isCreating, onCancel }) => {
  return (
    <form className="mx-auto max-w-xl">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <label className="block text-sm font-medium text-gray-800">
          Vehículo
          <input
            type="number"
            value={form.vehiculo_id ?? ''}
            onChange={onChange('vehiculo_id')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3.5 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
          />
        </label>

        <label className="block text-sm font-medium text-gray-800">
          Tipo de mantenimiento
          <input
            type="text"
            value={form.tipo_mantenimiento ?? ''}
            onChange={onChange('tipo_mantenimiento')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3.5 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
          />
        </label>

        <label className="block text-sm font-medium text-gray-800">
          Fecha
          <input
            type="date"
            value={form.fecha ?? ''}
            onChange={onChange('fecha')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3.5 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
          />
        </label>

        <label className="block text-sm font-medium text-gray-800">
          Kilometraje
          <input
            type="number"
            value={form.kilometraje ?? ''}
            onChange={onChange('kilometraje')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3.5 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
          />
        </label>

        <label className="block text-sm font-medium text-gray-800 sm:col-span-2">
          Descripción
          <textarea
            value={form.descripcion ?? ''}
            onChange={onChange('descripcion')}
            rows="3"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3.5 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
          />
        </label>

        <label className="block text-sm font-medium text-gray-800 sm:col-span-2">
          Costo
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.costo ?? ''}
            onChange={onChange('costo')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3.5 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
          />
        </label>
      </div>
    </form>
  );
};
