import { Request, Response } from 'express';
import { User } from '../models/users';
import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecret';

export const login:RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ message: 'Usuario o contraseña incorrectos' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) { 
      res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
      return;
    }

    const token = jwt.sign({ id: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, user });
    return
  } catch (err) {
      res.status(500).json({ message: 'Server error', error: err });
      return
    
  }
};

export const register:RequestHandler = async (req: Request, res: Response)=> {
  const { email,name, password,  role } = req.body;

  // server-side validation
  if (!email || !password || !name || role===null || role===undefined) {
    res.status(400).json({ message: 'Faltan campos obligatorios' });
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ message: 'Email inválido' });
    return
  }

  if (password.length < 8) {
    res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
    return
  }

  if (![0].includes(Number(role))) {
    res.status(400).json({ message: 'Rol inválido' });
    return
  }

  try {
    
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      res.status(409).json({ message: 'El email ya está registrado' });
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      role,
    });

  
    res.status(201).json({ message: 'Usuario registrado', user });
    return
  } catch (err) {
    res.status(500).json({ message: 'Error interno', detail: err });
    return
  }
};
