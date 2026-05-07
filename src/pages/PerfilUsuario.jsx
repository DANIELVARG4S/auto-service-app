import { useState } from "react";
import { InputField } from "../components/InputField";

export const PerfilUsuario = () => {

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    secondLastName: "",
    email: "",
    phone: ""
  });

  const handleChange = (field) => (e) => {
    setForm({
      ...form,
      [field]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos actualizados:", form);
  };

  return (
    <div className="max-h-screen bg-gray-100 flex items-center justify-center px-4">
      
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Mi Perfil
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <InputField 
              label="Nombre"
              className="sm:col-span-2"
              value={form.name}
              onChange={handleChange("name")}
              required
            />

            <InputField 
              label="Apellido Paterno"
              value={form.lastName}
              onChange={handleChange("lastName")}
            />

            <InputField 
              label="Apellido Materno"
              value={form.secondLastName}
              onChange={handleChange("secondLastName")}
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
              value={form.phone}
              onChange={handleChange("phone")}
            />

          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-700 transition-colors text-white py-3 rounded-lg font-semibold"
          >
            Guardar cambios
          </button>

        </form>
      </div>
    </div>
  );
};