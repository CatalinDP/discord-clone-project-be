import { generateToken } from '../utils/auth';
import bcrypt from 'bcryptjs';
import { Router, Response } from 'express';
import { UserRequest } from '../middlewares/authMiddleware';
import { supabase } from '../config/supabase';

const authRouter = Router();

const loginHandler = async (req: UserRequest, res: Response) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ error: 'Name and Password are required' });
  }

  const { data: usuario, error } = await supabase
    .from('users')
    .select('*')
    .or(`email.eq.${identifier}, name.eq.${identifier}`)
    .single();

  const isPasswordCorrect = await bcrypt.compare(password, usuario.password);

  if (error || !isPasswordCorrect) {
    return res.status(400).json({ error: 'Cretendials are not correct' });
  }

  const token = generateToken({
    id: usuario.id,
    email: usuario.email,
  });

  res.json({
    message: 'Login successful',
    token: token,
    user: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
    },
  });
};

authRouter.post('/api/auth/login', loginHandler);

export default authRouter;
