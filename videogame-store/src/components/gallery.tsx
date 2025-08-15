// src/components/home/Gallery.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import type{ RootState } from './store';
import { CRow, CCol, CCard } from '@coreui/react';
import './gallery.css'; // CSS para estilos de la galería


const Gallery: React.FC = () => {
  const games = useSelector((state: RootState) => state.videogame.videogamesSupply);

  if (!games || games.length === 0) {
    return <p style={{ textAlign: 'center' }}>No hay juegos disponibles.</p>;
  }

  return (
    <CRow xs={{ cols: 1 }} sm={{ cols: 2 }} md={{ cols: 3 }} lg={{ cols: 4 }} className="g-3">
      {games.map((game) => (
        
        <CCol key={game.id}>
           

          <CCard className="game-card" style={{ backgroundImage: `url(${game.image})` }}>
            <div className="game-title-overlay">
              {game.name}
            </div>
          </CCard>
        </CCol>
      ))}
    </CRow>
  );
};

export default Gallery;
