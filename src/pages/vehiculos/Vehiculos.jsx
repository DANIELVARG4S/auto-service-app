import React, { useEffect, useState } from 'react';
import client from '../../api/client';
import { Modal } from '../../components/Modal';
import { useVehiculos } from './hooks/useVehiculos';

export const Vehiculos = () => {
    const { data, loading, error } = useVehiculos();
    const [vehiculos, setVehiculos] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [editForm, setEditForm] = useState({
        marca: '',
        modelo: '',
        anio: '',
        color: '',
        placa: '',
        kilometraje: ''
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        setVehiculos(data || []);
    }, [data]);

    const openEditModal = (vehiculo) => {
        setSelectedVehicle(vehiculo);
        setEditForm({
            marca: vehiculo.marca || '',
            modelo: vehiculo.modelo || '',
            anio: vehiculo.anio ?? vehiculo.año ?? '',
            color: vehiculo.color || '',
            placa: vehiculo.placa ?? vehiculo.placas ?? '',
            kilometraje: vehiculo.kilometraje || ''
        });
        setMessage({ type: '', text: '' });
        setEditModalOpen(true);
    };

    const handleEditChange = (field) => (e) => {
        setEditForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleEditSubmit = async () => {
        if (!selectedVehicle?.id) return;

        setSaving(true);

        try {
            const response = await client.put(`/vehicles/${selectedVehicle.id}`, {
                ...editForm,
                anio: Number(editForm.anio) || 0,
                kilometraje: editForm.kilometraje
            });

            setVehiculos((prev) =>
                prev.map((vehiculo) =>
                    vehiculo.id === selectedVehicle.id ? { ...vehiculo, ...response.data } : vehiculo
                )
            );
            setEditModalOpen(false);
            setMessage({ type: 'success', text: 'Vehículo actualizado correctamente.' });
        } catch (error) {
            console.error('Error al actualizar vehículo:', error);
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'No se pudo actualizar el vehículo.'
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold text-gray-700">
                            Vehículos
                        </h2>
                    </div>

                    {message.text && (
                        <div className={`mx-4 mt-4 rounded-lg p-3 text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {message.text}
                        </div>
                    )}

                    {loading && (
                        <div className="p-6 text-center text-gray-600">Cargando vehículos...</div>
                    )}

                    {error && !loading && (
                        <div className="p-6 text-center text-red-600">No se pudieron cargar los vehículos.</div>
                    )}

                    {!loading && !error && (
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
                                                    onClick={() => openEditModal(vehiculo)}
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
            </div>

            <Modal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                title="Editar vehículo"
                description="Actualiza los datos del vehículo antes de enviarlos."
                onConfirm={handleEditSubmit}
                confirmLabel="Guardar cambios"
                isConfirming={saving}
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-gray-800">
                        Marca
                        <input
                            type="text"
                            value={editForm.marca}
                            onChange={handleEditChange('marca')}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-800">
                        Modelo
                        <input
                            type="text"
                            value={editForm.modelo}
                            onChange={handleEditChange('modelo')}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-800">
                        Año
                        <input
                            type="number"
                            value={editForm.anio}
                            onChange={handleEditChange('anio')}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-800">
                        Color
                        <input
                            type="text"
                            value={editForm.color}
                            onChange={handleEditChange('color')}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-800">
                        Placa
                        <input
                            type="text"
                            value={editForm.placa}
                            onChange={handleEditChange('placa')}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-800">
                        Kilometraje
                        <input
                            type="text"
                            value={editForm.kilometraje}
                            onChange={handleEditChange('kilometraje')}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-indigo-600 focus:ring-indigo-600"
                        />
                    </label>
                </div>
            </Modal>
        </div>
    );
};
