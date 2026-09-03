# Auto Service App

Aplicacion web para administrar vehiculos, mantenimientos y usuarios de un taller o garaje. El frontend consume una API REST desarrollada con NestJS.

## Tecnologias

- **React 19** para la construccion de la interfaz.
- **Vite** para el servidor de desarrollo y el proceso de build.
- **React Router DOM 7** para la navegacion y las rutas publicas y privadas.
- **TypeScript y JavaScript**: los hooks de logica de negocio y datos usan TypeScript, mientras que las vistas y componentes usan JSX/JavaScript.
- **Tailwind CSS 4** para los estilos utilitarios.
- **Axios** para las peticiones HTTP a la API.
- **SweetAlert2** para alertas y modales.
- **ESLint 9** para validacion de calidad del codigo.

## Arquitectura

El proyecto utiliza una arquitectura de frontend por funcionalidades, con separacion entre presentacion, logica de estado y acceso a datos:

```text
Usuario
	|
	v
Vistas y componentes React (pages/, components/)
	|
	v
Hooks de estado y efectos (hooks/ y pages/*/hooks/)
	|
	v
Cliente HTTP centralizado (src/api/client.js)
	|
	v
API REST de NestJS (http://localhost:3000/api)
```

### Capas principales

- **Aplicacion y enrutamiento**: `src/App.jsx` define las rutas publicas (`/login` y `/register`) y el area autenticada (`/dashboard/*`).
- **Layout y navegacion**: `src/pages/dashboard/Dashboard.jsx` contiene el layout principal, el menu lateral y las rutas internas de vehiculos, mantenimientos, perfil y usuarios.
- **Vistas por dominio**: `src/pages/` agrupa las pantallas de autenticacion, dashboard, vehiculos, mantenimientos y usuarios.
- **Componentes reutilizables**: `src/components/` contiene controles compartidos como botones, campos de entrada y modales. Cada funcionalidad tambien puede tener componentes propios dentro de su carpeta.
- **Hooks de datos y formularios**: los hooks gestionan `loading`, `error`, formularios y estado local, y mantienen las vistas enfocadas en la presentacion.
- **Acceso a la API**: `src/api/client.js` crea una instancia de Axios con la URL base, agrega automaticamente el token Bearer guardado en `localStorage` y redirige a `/login` cuando la API responde `401`.
- **Servicios de dominio**: `src/pages/users/services/userService.js` encapsula operaciones especificas de usuarios, como crear y actualizar registros.

## Estructura del proyecto

```text
src/
├── api/
│   ├── auth.js                 # Punto reservado para funciones de autenticacion
│   └── client.js               # Instancia Axios e interceptores JWT
├── components/                 # Componentes UI compartidos
├── hooks/                      # Hooks globales y de formularios
├── pages/
│   ├── dashboard/              # Layout y navegacion autenticada
│   ├── login/                  # Inicio de sesion
│   ├── register/               # Registro de usuarios
│   ├── mantenimientos/         # Gestion de mantenimientos
│   ├── user/                   # Perfil del usuario actual
│   ├── users/                  # Gestion de usuarios
│   └── vehiculos/              # Gestion de vehiculos
├── App.jsx                     # Enrutamiento principal
├── App.css                     # Estilos de la aplicacion
├── index.css                   # Estilos globales
└── main.jsx                    # Punto de entrada de React
```

## Requisitos

- Node.js 18 o superior.
- npm.
- Backend NestJS ejecutandose en `http://localhost:3000` y exponiendo la API bajo `/api`.

## Instalacion y ejecucion

```bash
npm install
npm run dev
```

Vite mostrara la URL local, normalmente `http://localhost:5173`.

## Scripts disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo con HMR
npm run build    # Genera la compilacion de produccion
npm run preview  # Sirve localmente la compilacion generada
npm run lint     # Ejecuta ESLint sobre el proyecto
```

## Integracion con el backend

El cliente HTTP utiliza actualmente la siguiente URL base:

```text
http://localhost:3000/api
```

Los hooks existentes consumen, entre otros, estos endpoints:

| Funcionalidad | Metodo | Endpoint |
| --- | --- | --- |
| Inicio de sesion | `POST` | `/auth/login` |
| Usuario actual | `GET` | `/auth/me` |
| Usuarios | `GET` | `/users/` |
| Crear usuario | `POST` | `/users` |
| Actualizar usuario | `PUT` | `/users/:id` |
| Vehiculos | `GET` | `/vehicles/` |
| Mantenimientos | `GET` | `/maintenance/` |

Despues de iniciar sesion, el token recibido se guarda como `token` en `localStorage`. Las peticiones posteriores lo envian mediante el encabezado `Authorization: Bearer <token>`.

## Flujo de navegacion

1. El usuario accede a `/login` o `/register`.
2. El formulario de login envia las credenciales a `/auth/login`.
3. Si la respuesta contiene un token, se guarda localmente y se navega a `/dashboard`.
4. Desde el dashboard se accede a vehiculos, mantenimientos y perfil. El modulo de usuarios se muestra a quienes tienen `rol_id === 1`.
5. Un error `401` elimina el token local y devuelve al usuario a `/login`.
