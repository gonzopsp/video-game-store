// src/controllers/videogame.controller.ts
import { Request, Response } from 'express';
import * as videogameService from '../services/videogame.service';

export async function create(req: Request, res: Response) {
  try {
    const game = await videogameService.createVideogame(req.body, req.file);
    res.status(201).json(game);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function list(req: Request, res: Response) {
  try {
    const games = await videogameService.getVideogames();
    res.json(games);
  } catch (err: any) {
    res.status(500).json({ error: 'Error al obtener videojuegos' });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const game = await videogameService.updateVideogame(Number(req.params.id), req.body, req.file);
    res.json(game);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await videogameService.deleteVideogame(Number(req.params.id));
    res.json({ message: 'Eliminado correctamente' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
