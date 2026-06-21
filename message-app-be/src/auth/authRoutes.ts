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

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .or(`email.eq.${identifier},name.eq.${identifier}`)
      .single();

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const registerHandler = async (req: UserRequest, res: Response) => {
  const { email, name, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }

  try {
    // Encrypt password before save
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data: newUser, error } = await supabase
      .from('users')
      .insert([
        {
          name: name,
          email: email,
          password: hashedPassword,
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const token = generateToken({
      id: newUser[0].id,
      email: newUser[0].email,
    });

    res.status(201).json({
      message: 'User registered successfully',
      token: token,
      user: {
        id: newUser[0].id,
        nombre: newUser[0].name,
        email: newUser[0].email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

authRouter.post('/login', loginHandler);
authRouter.post('/register', registerHandler);

export default authRouter;
