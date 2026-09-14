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

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .or(`email.eq.${identifier}, name.eq.${identifier}`)
    .single();

  if (error || !user) {
    return res.status(400).json({ error: 'Cretendials are not correct' });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (error || !isPasswordCorrect) {
    return res.status(400).json({ error: 'Cretendials are not correct' });
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
  });

  res.json({
    message: 'Login successful',
    token: token,
    user: {
      id: user.id,
      nombre: user.name,
      email: user.email,
    },
  });
};

authRouter.post('/api/auth/login', loginHandler);

export default authRouter;
