import { Request, Response, NextFunction } from 'express';

export const authorizeRoles = (...allowedRoles: number[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;
    if (!user || !allowedRoles.includes(user.role)) {
      res.status(403).json({ message: 'Acceso denegado' });
      return;
    }
    next();
  };
};
