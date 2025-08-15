// src/controllers/videogame.controller.ts
import { Request, Response } from 'express';
import * as videogameService from '../services/videogame.service';
import path from 'path';

const API_HOST = process.env.API_HOST || 'http://localhost:4000';

export async function create(req: Request, res: Response) {
  try {
    const imageFile = req.file; // multer middleware
    const game = await videogameService.createVideogame(req.body, imageFile);
    
    // Añadimos la URL completa de la imagen al JSON
    const gameJson = {
      ...game.toJSON(),
      image: game.image ? `${API_HOST}/images/${game.image}` : null,
    };

    res.status(201).json(gameJson);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

export async function list(req: Request, res: Response) {
  try {
    const games = await videogameService.getVideogames();

    // Creamos un array con URLs completas de las imágenes
    const gamesWithImages = games.map(game => ({
      ...game.toJSON(),
      image: game.image ? `${API_HOST}/images/${game.image}` : null,
    }));

    res.json(gamesWithImages);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener videojuegos' });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const imageFile = req.file; // multer
    const game = await videogameService.updateVideogame(
      Number(req.params.id),
      req.body,
      imageFile
    );

    const gameJson = {
      ...game.toJSON(),
      image: game.image ? `${API_HOST}/images/${game.image}` : null,
    };

    res.json(gameJson);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await videogameService.deleteVideogame(Number(req.params.id));
    res.json({ message: 'Eliminado correctamente' });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}
