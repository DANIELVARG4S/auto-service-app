import { useState, ChangeEvent, FormEvent } from "react";
import client from "../api/client";
import { useNavigate } from "react-router-dom";

export interface LoginFormState {
  email: string;
  password: string; // Opcional si en algún momento lo limpias, o obligatorio según prefieras
  [key: string]: any; // Permite flexibilidad si inicializas con campos extra
}

// 2. Tipamos la respuesta esperada de tu backend NestJS
interface LoginResponse {
  token: string;
}

export const useLoginForm = (initialState: LoginFormState) => {
  // TypeScript infiere automáticamente que formData es de tipo LoginFormState
  const [formData, setFormData] = useState<LoginFormState>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); 

  // 3. Tipamos el manejador de cambios. 
  // 'name' es un string (la propiedad a cambiar) y 'value' es el nuevo texto.
  const handleChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 4. Tipamos el evento del Formulario utilizando FormEvent de React
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);   
    
    try {
      // 5. Le avisamos a Axios que esperamos un objeto que cumple con LoginResponse
      const response = await client.post<LoginResponse>("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      
      const { token } = response.data;

      // Nota: NestJS por defecto devuelve 201 en peticiones POST exitosas
      if (response.status === 201 && token) {
        localStorage.setItem("token", token);

        alert("Login successful");

        setFormData(initialState);

        navigate("/dashboard", { replace: true });
      } else {
        alert("Credenciales incorrectas");
      }
      
    } catch (error: any) {
      console.error(error);
      // El tipado 'any' o 'unknown' en el catch nos obliga a usar safe-navigation (?.)
      alert(error.response?.data?.message || "Error al iniciar sesión");
    } finally {            
      setLoading(false);
    }   
  };

  return { formData, handleChange, handleSubmit, loading };
};