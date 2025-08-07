import { Router } from "express";
import { Videogame } from "./models/videogame";
import { login, register } from './controllers/auth.controller';
import { authenticate } from "./middleware/auth.middleware";
import { User } from "./models/users";
const router = Router()

//Routing

//public
// VIDEOGAME
router.get('/videogame', async (req, res) => {
    try {
        const videogames = await Videogame.findAll();  //fetch all videogames from db
        res.json(videogames); //sends data to json
    } catch (error) {
        console.error('Error fetching videogames:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



//Authentication

router.post('/login', login);
router.post('/registro', register);


//protected routes
//User management 
//admin only
router.get("/users", authenticate, async(req, res) => {
  const user = (req as any).user;
  if (user.role !== 4) {
    res.status(403).json({ message: 'Access denied: Admins only' });
    return
  }
  try {
    const users = await User.findAll();  
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// user or admin: get user by ID
router.get("/users/:id", authenticate, (req, res) => {
  const user = (req as any).user;
  const { id } = req.params;

  // allow if admin or the user is accessing their own data
  if (user.role !== 4 && user.id !== id) {
    res.status(403).json({ message: 'Access denied' });
  }

  res.send(`Get user ${id}`);
});
// user only: update own data
router.put("/users/:id", authenticate, (req, res) => {
  const user = (req as any).user;
  const { id } = req.params;

  if (user.id !== id) {
    res.status(403).json({ message: 'You can only update your own account' });
  }

  res.send(`Update user ${id}`);
});

 



// default test routes
//router.post('/', (req,res) => res.send("Desde POST"));
//router.put('/', (req,res) => res.send("Desde PUT"));
//router.patch('/', (req,res) => res.send("Desde PATCH"));
//router.delete('/', (req,res) => res.send("Desde DELETE"));

export default router;
