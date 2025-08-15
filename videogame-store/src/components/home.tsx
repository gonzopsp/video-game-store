// src/components/home/Home.tsx
import React from 'react';
import Gallery from './gallery';
import { CContainer, CRow, CCol, CCard, CCardBody, CCardText } from '@coreui/react';
import './home.css'; // Creamos este CSS para el fondo y estilos suaves

const Home: React.FC = () => {
  return (
    <div className="home-background">
      {/* Banner de bienvenida */}
      <CContainer className="text-center py-5">
        <h1 className="home-title">Bienvenido a GameStore</h1>
        <CCard className="mx-auto my-3 p-3 home-card" style={{ maxWidth: '600px', backgroundColor: 'rgba(255,255,255,0.85)' }}>
          <CCardBody>
            <CCardText>
              Explora nuestra colección de videojuegos y encuentra tus favoritos. ¡Disfruta de una experiencia relajante y familiar!
            </CCardText>
          </CCardBody>
        </CCard>
      </CContainer>

      {/* Galería de juegos */}
      <CContainer className="mt-4">
        <Gallery />
      </CContainer>
    </div>
  );
};

export default Home;
