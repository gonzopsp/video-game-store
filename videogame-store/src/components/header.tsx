// src/Header.tsx

import { CNavbar, CNavbarBrand, CNavbarNav, CNavItem, CNavLink, CNavbarToggler, CCollapse } from '@coreui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { useState } from 'react';

interface Props {
  isLoggedIn: boolean;
}

const Header: React.FC <Props>= ({ isLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLoggedIn) {
      // not logged in: redirect to login page
      navigate('/login');
    } else {
      // logged in: toggle the menu
      setMenuOpen(!menuOpen);
    }
  };
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role;





  return (
    <CNavbar expand="lg" colorScheme="light" className="bg-light">
      <CNavbarBrand href="#">GameStore</CNavbarBrand>
      
        <CNavbarNav className="me-auto">
          <CNavItem>
            <CNavLink href="/">Home</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink  href="/juegos">Games</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href='/acerca'>About Us</CNavLink>
          </CNavItem>
         
        </CNavbarNav>
        <CNavbarNav>
          <CNavItem>
            <CNavLink href="/cart">
              <FontAwesomeIcon icon={faShoppingCart} /> Cart
            </CNavLink>
          </CNavItem>

           <CNavItem>
          {!isLoggedIn ? (
            <CNavLink href="/login" style={{ cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faUser} /> Login
            </CNavLink>
          ) : (
            <div onClick={handleClick} style={{ cursor: 'pointer', display: 'inline-block', userSelect: 'none' }}>
              <FontAwesomeIcon icon={faUser} />
            </div>
          )}

          {isLoggedIn && (
            <CCollapse visible={menuOpen} className="position-absolute bg-white border rounded p-2" style={{ right: 0, top: '100%', zIndex: 1000 }}>
              <CNavLink href="/profile">Perfil</CNavLink>
              
              
              {role === 4 && <CNavLink href="/users">Usuarios</CNavLink>}
              <CNavLink href="/logout">Desloguearse</CNavLink>
            </CCollapse>
          )}
        </CNavItem>

        </CNavbarNav>
    </CNavbar>
  );
};

export default Header;