import { useState, useEffect } from "react";

import { useCurrentUser } from "../../hooks/useCurrentUser";
import client from "../../api/client";
import { Modal } from "../../components/Modal";
import { InputField } from "./components/InputField";


export const PerfilUsuario = () => {
  
  const { data, loading } = useCurrentUser();

  const [form, setForm] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    email: "",
    telefono: ""
  });

  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Llenar el formulario cuando los datos del usuario lleguen
  useEffect(() => {
    if (data) {
      setForm({
        nombre: data.nombre || "",
        apellido_paterno: data.apellido_paterno || "",
        apellido_materno: data.apellido_materno || "",
        email: data.email || "",
        telefono: data.telefono || ""
      });
    }
  }, [data]);

  const handleChange = (field) => (e) => {
    setForm({
      ...form,
      [field]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setIsModalOpen(true);
  };

  const handleConfirmSend = async () => {
    if (!data?.id) {
      setMessage({
        type: "error",
        text: "No se pudieron encontrar los datos del usuario"
      });
      setIsModalOpen(false);
      return;
    }

    setSaving(true);
    setIsModalOpen(false);

    try {
      const response = await client.put(`/users/${data.id}`, {
        nombre: form.nombre,
        apellido_paterno: form.apellido_paterno,
        apellido_materno: form.apellido_materno,
        email: form.email,
        telefono: form.telefono
      });

      setMessage({
        type: "success",
        text: "¡Perfil actualizado correctamente!"
      });
      console.log("Usuario actualizado:", response.data);
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Error al guardar los cambios"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-screen bg-gray-100 flex items-center justify-center px-4">
      
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Mi Perfil
        </h2>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg text-center font-semibold ${
            message.type === "success" 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <InputField 
              label="Nombre"
              className="sm:col-span-2"
              value={form.nombre}
              onChange={handleChange("nombre")}
              required
            />

            <InputField
              label="Apellido Paterno"
              value={form.apellido_paterno}
              onChange={handleChange("apellido_paterno")}
            />

            <InputField 
              label="Apellido Materno"
              value={form.apellido_materno}
              onChange={handleChange("apellido_materno")}
            />

            <InputField 
              label="Correo electrónico"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              autoComplete="email"
            />

            <InputField 
              label="Teléfono"
              value={form.telefono}
              onChange={handleChange("telefono")}
            />

          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 transition-colors text-white py-3 rounded-lg font-semibold"
          >
            {saving ? "Guardando..." : "Enviar datos"}
          </button>

        </form>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirmar envío de datos"
        description="Revisa la información antes de enviarla al sistema."
        onConfirm={handleConfirmSend}
        confirmLabel="Enviar datos"
        isConfirming={saving}
      >
        <div className="space-y-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
          <div>
            <span className="font-semibold text-gray-900">Nombre:</span> {form.nombre || "—"}
          </div>
          <div>
            <span className="font-semibold text-gray-900">Apellido paterno:</span> {form.apellido_paterno || "—"}
          </div>
          <div>
            <span className="font-semibold text-gray-900">Apellido materno:</span> {form.apellido_materno || "—"}
          </div>
          <div>
            <span className="font-semibold text-gray-900">Correo:</span> {form.email || "—"}
          </div>
          <div>
            <span className="font-semibold text-gray-900">Teléfono:</span> {form.telefono || "—"}
          </div>
        </div>
      </Modal>
    </div>
  );
};