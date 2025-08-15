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
    <CCard style={{ width: '18rem', margin: '1rem', 
      borderRadius:'12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'

     }}>

      <CCardImage src={image} alt={name} style={{objectFit:'cover', height:'180px'}}/>

      <CCardBody style={{textAlign: 'center'}}>
        <CCardTitle>{name}</CCardTitle>

        <CCardText style={{marginBottom:'1rem', lineHeight:'1.4'}}>
          <strong>Genre:</strong> {genre} <br />
          <strong>Price:</strong> ${price} <br />
          <strong>Stock:</strong> {stock} available <br />
          <strong>Description:</strong>  <br />
        
        <span style={{display: 'inline=block', marginTop:'0.5rem'}}>
            {description}
        </span>

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
