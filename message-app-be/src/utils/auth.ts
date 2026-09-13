import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable');
}

interface UserPayload {
  id: number;
  email: string;
}

export const generateToken = (user: UserPayload): string => {
  const options: SignOptions = {
    expiresIn: '2h',
  };
  return jwt.sign(user, JWT_SECRET, options);
};

export const verifyToken = (token: string): { id: number; email: string }  | null => {
  try {
    const verified = jwt.verify(token, JWT_SECRET) as JwtPayload & UserPayload;
    return {
      id: verified.id,
      email: verified.email,
    };
  } catch {
    return null;
  }
};
