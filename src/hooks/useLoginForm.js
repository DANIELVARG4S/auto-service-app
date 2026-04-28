import { useState } from "react";
import client from "../api/client";

export const useLoginForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const handleChange = (name) => (value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);   
        console.log("Form data submitted:", formData);
        try {
            const response = await client.post("/auth/login", {
                email: formData.email,
                password: formData.password,
            });
            // const { token } = response.data;
            // localStorage.setItem("token", token);
            // console.log("Login response:", response.data);

            alert(response.data.message || "Login successful");
            // setFormData(initialState);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Error al iniciar sesión");
        } finally {            
            setLoading(false);
        }   
    }

    return { formData, handleChange, handleSubmit, loading };
};