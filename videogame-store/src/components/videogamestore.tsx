// src/components/videogamestore.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from './store';
import { loadGames } from '../hooks/videogameSlice';
import { CCard, CCardBody, CCardImage, CCardTitle, CCardText, CButton, CSpinner } from '@coreui/react';

const VideoGameStore: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { videogamesSupply, status, error } = useSelector((state: RootState) => state.videogame);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadGames());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center mt-5">
        <CSpinner color="primary" />
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="text-center text-danger mt-5">Error: {error}</div>;
  }

  if (videogamesSupply.length === 0) {
    return <div className="text-center mt-5">No hay juegos disponibles.</div>;
  }

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {videogamesSupply.map((game) => (
        <CCard key={game.id} style={{ width: '18rem', margin: '1rem' }}>
          {game.image && <CCardImage orientation="top" src={game.image} alt={game.name} />}
          <CCardBody>
            <CCardTitle>{game.name}</CCardTitle>
            <CCardText>
              Género: {game.genre} <br />
              Precio: ${game.price} <br />
              Stock: {game.stock} disponible
            </CCardText>
            <CButton color="primary" disabled={game.stock <= 0}>
              {game.stock > 0 ? 'Comprar' : 'Agotado'}
            </CButton>
          </CCardBody>
        </CCard>
      ))}
    </div>
  );
};

export default VideoGameStore;
