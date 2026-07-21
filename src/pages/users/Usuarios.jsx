import React, { useEffect, useState } from 'react';
import { useUsers } from './hooks/useUsers';
import { Modal } from '../../components/Modal';
import client from '../../api/client';

export const Usuarios = () => {
  const { data, loading, error } = useUsers();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    telefono: ''
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    setUsers(data || []);
  }, [data]);

  const openEditModal = (usuario) => {
    setSelectedUser(usuario);
    setForm({
      nombre: usuario.nombre || '',
      apellido_paterno: usuario.apellido_paterno || '',
      apellido_materno: usuario.apellido_materno || '',
      email: usuario.email || '',
      telefono: usuario.telefono || ''
    });
    setMessage({ type: '', text: '' });
    setIsModalOpen(true);
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleConfirmSend = async () => {
    if (!selectedUser?.id) return;

    setSaving(true);

    try {
      const response = await client.put(`/users/${selectedUser.id}`, form);

      setUsers((prev) =>
        prev.map((usuario) =>
          usuario.id === selectedUser.id ? { ...usuario, ...response.data } : usuario
        )
      );

      setIsModalOpen(false);
      setMessage({ type: 'success', text: 'Usuario actualizado correctamente.' });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'No se pudo actualizar el usuario.'
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-700">
            Usuarios
          </h2>
        </div>

        {message.text && (
          <div className={`mx-4 mt-4 rounded-lg p-3 text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        {loading && <div className="p-6 text-center text-gray-600">Cargando usuarios...</div>}
        {error && !loading && <div className="p-6 text-center text-red-600">No se pudieron cargar los usuarios.</div>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-800 text-white sticky top-0">
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
                  <tr
                    key={usuario.id || index}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="px-4 py-3">{usuario.nombre}</td>
                    <td className="px-4 py-3">{usuario.apellido_paterno}</td>
                    <td className="px-4 py-3">{usuario.apellido_materno}</td>
                    <td className="px-4 py-3">{usuario.email}</td>
                    <td className="px-4 py-3">{usuario.telefono}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openEditModal(usuario)}
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
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar usuario"
        description="Revisa y confirma los datos antes de enviarlos."
        onConfirm={handleConfirmSend}
        confirmLabel="Guardar cambios"
        isConfirming={saving}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-gray-800">
            Nombre
            <input
              type="text"
              value={form.nombre}
              onChange={handleChange('nombre')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
            />
          </label>

          <label className="block text-sm font-medium text-gray-800">
            Apellido paterno
            <input
              type="text"
              value={form.apellido_paterno}
              onChange={handleChange('apellido_paterno')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
            />
          </label>

          <label className="block text-sm font-medium text-gray-800">
            Apellido materno
            <input
              type="text"
              value={form.apellido_materno}
              onChange={handleChange('apellido_materno')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
            />
          </label>

          <label className="block text-sm font-medium text-gray-800">
            Correo
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
            />
          </label>

          <label className="block text-sm font-medium text-gray-800 sm:col-span-2">
            Teléfono
            <input
              type="text"
              value={form.telefono}
              onChange={handleChange('telefono')}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
            />
          </label>
        </div>
      </Modal>
    </div>
  );
};
