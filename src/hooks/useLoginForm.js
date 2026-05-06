import { useState } from "react";
import client from "../api/client";
import { useNavigate } from "react-router-dom";

export const useLoginForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleChange = (name) => (value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);   
        // console.log("Form data submitted:", formData);
        try {
            const response = await client.post("/auth/login", {
                email: formData.email,
                password: formData.password,
            });
            const { token } = response.data;

            if (response.status === 201 && token) {
                // console.log("Login successful, received token:", token);
                localStorage.setItem("token", token);

                alert("Login successful");

                setFormData(initialState);

                navigate("/dashboard", { replace: true });
            } else {
                alert("Credenciales incorrectas");
            }
            
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Error al iniciar sesión");
        } finally {            
            setLoading(false);
        }   
    }

    return { formData, handleChange, handleSubmit, loading };
};