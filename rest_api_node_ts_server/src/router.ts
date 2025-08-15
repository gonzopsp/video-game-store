import { Router, Request, Response, NextFunction } from 'express';
import { Videogame } from './models/videogame';
import { User } from './models/users';
import { login, register } from './controllers/auth.controller';
import { authenticate } from './middleware/auth.middleware';
import { authorizeRoles } from './middleware/role.middleware';
import { create, list, update, remove } from './controllers/videogame.controller';
import { uploadImage } from './middleware/uploadImage';



const router = Router();

// Rutas públicas
router.post('/login', login);
router.post('/registro', register);


// Games
router.get('/videogame', list);





// Rutas protegidas para videojuegos - solo vendedores (role 1) y admins (role 4)
router.post('/videogame', authenticate, authorizeRoles(1, 4), uploadImage.single('image'), create);
router.put('/videogame/:id', authenticate, authorizeRoles(1, 4), uploadImage.single('image'), update);
router.delete('/videogame/:id', authenticate, authorizeRoles(1, 4), remove);

// Rutas para usuarios

// Obtener todos los usuarios (solo admins)
router.get('/users', authenticate, authorizeRoles(4), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Obtener perfil propio o admin puede obtener cualquier usuario
router.get('/users/:id', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loggedUser = (req as any).user;
    const { id } = req.params;

    if (loggedUser.role !== 4 && loggedUser.id !== id) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    const userData = await User.findByPk(id);
    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(userData);
  } catch (error) {
    next(error);
  }
});

// Actualizar perfil propio (o admin puede actualizar cualquiera)
router.put('/users/:id', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loggedUser = (req as any).user;
    const { id } = req.params;

    if (loggedUser.role !== 4 && loggedUser.id !== id) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    const userToUpdate = await User.findByPk(id);
    if (!userToUpdate) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await userToUpdate.update(req.body);
    res.json(userToUpdate);
  } catch (error) {
    next(error);
  }
});

// Opcional: eliminar usuario (solo admin)
router.delete('/users/:id', authenticate, authorizeRoles(4), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const userToDelete = await User.findByPk(id);
    if (!userToDelete) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await userToDelete.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
