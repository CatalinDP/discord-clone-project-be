import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import authRouter from './auth/authRoutes';
import { protectRoute } from './middlewares/authMiddleware';
import { UserRequest } from './middlewares/authMiddleware';

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
    message: 'Servidor de Node.js + TypeScript corriendo correctamente',
  });
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`[server]: Servidor backend corriendo en http://localhost:${PORT}`);
});

/// Auth --
app.post('/api/auth/', authRouter);

app.get('/api/home', protectRoute, (req: UserRequest, res: express.Response) => {
  res.json({
    message: `El token es: ${req.user?.email}`,
    id: req.user?.id,
  });
});
