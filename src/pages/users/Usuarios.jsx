import React, { useEffect, useState } from 'react';
import { useUsers } from './hooks/useUsers';
import UsersTable from './components/UsersTable';
import UserForm from './components/UserForm';
import UserModal from './components/UserModal';
import client from '../../api/client';
import { updateUser, createUser } from './services/userService';
import Swal from 'sweetalert2';

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
    telefono: '',
    password: '',
    confirmPassword: '',
    rol_id: ''
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
      telefono: usuario.telefono || '',
      password: '',
      confirmPassword: '',
      rol_id: usuario.rol_id 
    });
    setMessage({ type: '', text: '' });
    setIsModalOpen(true);
  };

  const handleChange = (field) => (e) => {
    const value = typeof e === 'string' ? e : e.target?.value;
    const parsed = field === 'rol_id' && value !== '' ? Number(value) : value;
    setForm((prev) => ({ ...prev, [field]: parsed }));
  };

  const buildUserPayload = (values) => {
    const payload = {
      nombre: values.nombre,
      apellido_paterno: values.apellido_paterno,
      apellido_materno: values.apellido_materno,
      email: values.email,
      telefono: values.telefono,
      rol_id: values.rol_id,
    };

    if (values.password) {
      payload.password = values.password;
    }

    return payload;
  };

  const handleConfirmSend = async () => {
    if (!selectedUser?.id) return;

    setSaving(true);

    try {
      const payload = buildUserPayload(form);
      const data = await updateUser(selectedUser.id, payload);

      setUsers((prev) =>
        prev.map((usuario) =>
          usuario.id === selectedUser.id ? { ...usuario, ...data } : usuario
        )
      );

      setIsModalOpen(false);
      setMessage({ type: 'success', text: 'Usuario actualizado correctamente.' });
      Swal.fire({ icon: 'success', title: 'Actualizado', text: 'Usuario actualizado correctamente.' });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'No se pudo actualizar el usuario.'
      });
      Swal.fire({ icon: 'error', title: 'Error', text: error.response?.data?.message || 'No se pudo actualizar el usuario.' });
    } finally {
      setSaving(false);
    }
  };

  const handleCreateSend = async () => {
    // Basic validation similar to registration
    if (!form.nombre || !form.apellido_paterno || !form.email) {
      setMessage({ type: 'error', text: 'Nombre, apellido paterno y correo son obligatorios.' });
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage({ type: 'error', text: 'Las contraseñas no coinciden.' });
      return;
    }

    setSaving(true);
    try {
      const payload = buildUserPayload(form);
      payload.password = form.password || undefined;

      const data = await createUser(payload);

      setUsers((prev) => [data, ...prev]);

      setIsModalOpen(false);
      setMessage({ type: 'success', text: 'Usuario agregado correctamente.' });
      Swal.fire({ icon: 'success', title: 'Creado', text: 'Usuario agregado correctamente.' });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      setMessage({ type: 'error', text: error.response?.data?.message || 'No se pudo crear el usuario.' });
      Swal.fire({ icon: 'error', title: 'Error', text: error.response?.data?.message || 'No se pudo crear el usuario.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-1 bg-gray-100 min-h-screen ">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Usuarios</h2>
            <button
              onClick={() => {
                setSelectedUser(null);
                setForm({
                  nombre: '',
                  apellido_paterno: '',
                  apellido_materno: '',
                  email: '',
                  telefono: '',
                  rol_id: ''
                });
                setMessage({ type: '', text: '' });
                setIsModalOpen(true);
              }}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Agregar usuario
            </button>
          </div>
        </div>

        {message.text && (
          <div className={`mx-4 mt-4 rounded-lg p-3 text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}
        
        {!loading && !error && (
          <UsersTable users={users} onEdit={openEditModal} />
        )}
      </div>
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedUser={selectedUser}
        onConfirm={selectedUser ? handleConfirmSend : handleCreateSend}
        confirmLabel={selectedUser ? 'Guardar cambios' : 'Agregar usuario'}
        isConfirming={saving}
        form={form}
        onChange={handleChange}
      />
    </div>
  );
};
