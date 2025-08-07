// src/components/VideoGameStore.tsx
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CCardImage,
} from '@coreui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadGames, comprar } from '../hooks/videogameSlice'; // ✅ corrected import
import type { RootState, AppDispatch } from './store';
import type { videogame } from '../types/types';

interface GameCardProps extends videogame {
  onBuy: () => void;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  genre,
  name,
  description,
  image,
  price,
  stock,
  onBuy,
}) => {
  return (
    <CCard style={{ width: '18rem', margin: '1rem' }}>
      <CCardImage src={image} alt={name} />
      <CCardBody>
        <CCardTitle>{name}</CCardTitle>
        <CCardText>
          Genre: {genre} <br />
          Price: ${price} <br />
          Stock: {stock} available <br />
          Description: {description}
        </CCardText>
        <CButton color="primary" onClick={onBuy} disabled={stock <= 0}>
          {stock > 0 ? 'Buy' : 'Out of Stock'}
        </CButton>
      </CCardBody>
    </CCard>
  );
};

export default function VideoGameStore() {
  const dispatch = useDispatch<AppDispatch>();
  const games = useSelector((state: RootState) => state.videogame.videogamesSupply);

  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {games.map((game:videogame) => (
        <GameCard
          key={game.id}
          {...game}
          onBuy={() => dispatch(comprar({ id: game.id }))}
        />
      ))}
    </div>
  );
}
