import { CNavbar, CNavbarBrand, CNavbarNav, CNavItem, CNavLink, CNavbarToggler, CCollapse } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import './header.css';

interface Props {
  isLoggedIn: boolean;
}

const Header: React.FC<Props> = ({ isLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setMenuOpen(!menuOpen);
    }
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role;

  return (
    <CNavbar expand="lg" className="custom-navbar shadow-sm">
      <CNavbarBrand href="#" className="brand-text">GameStore</CNavbarBrand>

      <CNavbarNav className="me-auto">
        <CNavItem>
          <CNavLink href="/" className="nav-link-custom">Home</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="/juegos" className="nav-link-custom">Games</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="/acerca" className="nav-link-custom">About Us</CNavLink>
        </CNavItem>
      </CNavbarNav>

      <CNavbarNav>
        <CNavItem>
          <CNavLink href="/cart" className="nav-link-custom">
            <FontAwesomeIcon icon={faShoppingCart} /> Cart
          </CNavLink>
        </CNavItem>

        <CNavItem>
          {!isLoggedIn ? (
            <CNavLink href="/login" className="nav-link-custom" style={{ cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faUser} /> Login
            </CNavLink>
          ) : (
            <div onClick={handleClick} className="user-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
          )}

          {isLoggedIn && (
            <CCollapse visible={menuOpen} className="menu-dropdown">
              <CNavLink href="/profile">Perfil</CNavLink>
              {role === 4 && <CNavLink href="/users">Usuarios</CNavLink>}

              {(role === 4 || role === 1) && <CNavLink href="/createGame">Crear juegos</CNavLink>}
              <CNavLink href="/logout">Desloguearse</CNavLink>
            </CCollapse>
          )}
        </CNavItem>
      </CNavbarNav>
    </CNavbar>
  );
};

export default Header;
