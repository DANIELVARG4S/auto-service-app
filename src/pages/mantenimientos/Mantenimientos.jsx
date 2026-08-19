import React, { useEffect, useState } from 'react';
import { Table } from './components/Table';
import { MantenimientosModal } from './components/MantenimientosModal';
import { useMantenimientos } from './hooks/useMantenimientos';

const initialForm = {
  vehiculo_id: '',
  tipo_mantenimiento: '',
  fecha: '',
  kilometraje: '',
  descripcion: '',
  costo: '',
};

export const Mantenimientos = () => {
  const { mantenimientos, loading, error } = useMantenimientos();
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMantenimiento, setSelectedMantenimiento] = useState(null);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    setItems(mantenimientos || []);
  }, [mantenimientos]);

  const openCreateModal = () => {
    setSelectedMantenimiento(null);
    setForm(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (mantenimiento) => {
    setSelectedMantenimiento(mantenimiento);
    setForm({
      vehiculo_id: mantenimiento.vehiculo_Id ?? '',
      tipo_mantenimiento: mantenimiento.tipo_Mantenimiento ?? '',
      fecha: mantenimiento.fecha ?? '',
      kilometraje: mantenimiento.kilometraje ?? '',
      descripcion: mantenimiento.descripcion ?? '',
      costo: mantenimiento.costo ?? '',
    });
    setIsModalOpen(true);
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [field]: ['vehiculo_id', 'kilometraje', 'costo'].includes(field)
        ? (value === '' ? '' : Number(value))
        : value,
    }));
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-gray-700">Mantenimientos</h2>
            <button
              type="button"
              onClick={openCreateModal}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              Agregar mantenimiento
            </button>
          </div>
        </div>

        {loading && (
          <div className="p-6 text-center text-gray-600">Cargando mantenimientos...</div>
        )}

        {error && !loading && (
          <div className="p-6 text-center text-red-600">No se pudieron cargar los mantenimientos.</div>
        )}

        {!loading && !error && <Table mantenimientos={items} onEdit={openEditModal} />}
      </div>

      <MantenimientosModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedUser={selectedMantenimiento}
        onConfirm={handleConfirm}
        confirmLabel={selectedMantenimiento ? 'Guardar cambios' : 'Agregar mantenimiento'}
        isConfirming={false}
        form={form}
        onChange={handleChange}
      />
    </div>
  );
};
