
import { useState } from "react";
import client from "../api/client"; 

export const useRegisterForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // Manejador genérico para cualquier campo
  const handleChange = (name) => (value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      // Mapeamos los nombres del estado a los nombres que espera tu API NestJS
      await client.post("/auth/register", {
        nombre: formData.firstName,
        apellido_paterno: formData.lastName,
        apellido_materno: formData.secondLastName,
        email: formData.email,
        password: formData.password,
        telefono: formData.phoneNumber,
      });
      
      alert("Usuario registrado con éxito");
      setFormData(initialState); // Limpia el formulario
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading };
};