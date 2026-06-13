# 🚀 Discord Clone - Backend API

Servidor robusto en Node.js desarrollado con Express y TypeScript para gestionar la lógica de negocio, autenticación y comunicación en tiempo real del clon de Discord.

---

## 🛠️ Tecnologías y Herramientas

- **Entorno de Ejecución:** [Node.js](https://nodejs.org/) (v20+)
- **Framework Web:** [Express](https://expressjs.com/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Gestor de Paquetes:** [pnpm](https://pnpm.io/) (v11)
- **Base de Datos y Auth:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Tiempo Real:** [Socket.io](https://socket.io/) (WebSockets)
- **Herramienta de Dev:** `tsx` (Ejecución y recarga rápida en TS)

---

## 📦 Arquitectura del Sistema

El backend actúa como un orquestador intermedio entre la aplicación de React y la base de datos en la nube.

1.  Recibe eventos en tiempo real mediante **WebSockets**.
2.  Valida la lógica de negocio, sesiones y permisos de usuarios.
3.  Persiste la información de servidores, canales y mensajes en **Supabase**.

---

## 🚀 Instalación y Desarrollo Local

Sigue estos pasos para levantar el servidor en tu entorno local:

### 1. Clonar el repositorio y entrar a la carpeta

```bash
cd message-app-be
```
