// src/services/videogame.service.ts
import fs from 'fs';
import path from 'path';
import { Videogame } from '../models/videogame';

const imgPath = path.join(__dirname, '../data/img/videogames');

export async function createVideogame(data: any, imageFile?: Express.Multer.File) {
  return await Videogame.create({
    ...data,
    image: imageFile?.filename || null,
  });
}

export async function getVideogames() {
  return await Videogame.findAll();
}

export async function updateVideogame(id: number, data: any, imageFile?: Express.Multer.File) {
  const game = await Videogame.findByPk(id);
  if (!game) throw new Error('Juego no encontrado');

  if (imageFile) {
    if (game.image) {
      // Borra la imagen antigua del disco si existe
      const oldImagePath = path.join(imgPath, game.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    game.image = imageFile.filename;
  }

  Object.assign(game, data);
  await game.save();

  return game;
}

export async function deleteVideogame(id: number) {
  const game = await Videogame.findByPk(id);
  if (!game) throw new Error('Juego no encontrado');

  if (game.image) {
    const imagePath = path.join(imgPath, game.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await game.destroy();
}
