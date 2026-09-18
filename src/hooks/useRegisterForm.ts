import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import client from "../api/client";

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export const useRegisterForm = (initialState: RegisterFormData) => {
  const [formData, setFormData] = useState<RegisterFormData>(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (name: keyof RegisterFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      await Swal.fire({
        icon: "warning",
        title: "Revisa tus contraseñas",
        text: "Las contraseñas no coinciden.",
        confirmButtonText: "Entendido",
      });
      return;
    }

    setLoading(true);
    try {
      await client.post("/auth/register", {
        nombre: formData.firstName,
        apellido_paterno: formData.lastName,
        apellido_materno: formData.secondLastName,
        email: formData.email,
        password: formData.password,
        telefono: formData.phoneNumber,
      });

      await Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Tu usuario fue registrado correctamente.",
        confirmButtonText: "Continuar",
      });
      setFormData(initialState);
      navigate("/login", { replace: true });
    } catch (error: unknown) {
      console.error(error);
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : undefined;
      await Swal.fire({
        icon: "error",
        title: "No se pudo registrar",
        text: message || "Ocurrió un error al registrar el usuario.",
        confirmButtonText: "Entendido",
      });
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading };
};
