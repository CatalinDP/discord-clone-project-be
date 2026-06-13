import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
// El puerto por defecto será el 5000 si no se define en el .env
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba de la API (Health check)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Servidor de Node.js + TypeScript corriendo correctamente' 
  });
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`[server]: Servidor backend corriendo en http://localhost:${PORT}`);
});