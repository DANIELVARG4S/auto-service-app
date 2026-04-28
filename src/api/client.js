import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000/api", // URL de tu backend NestJS
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Interceptor para agregar el token automáticamente
// client.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ⚠️ Interceptor para manejar errores globales
// client.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Token inválido o expirado
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

export default client;