// import React from 'react';
// import { Container, Navbar, Nav } from 'react-bootstrap';
// import { useAuth } from '../context/AuthContext';
// import UserProfile from './auth/UserProfile';
// import ThemeToggle from './ThemeToggle';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Navbar bg="primary" variant="dark" expand="lg">
//       <Container>
//         <Navbar.Brand as={Link} to="/">Мое приложение</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             {isAuthenticated && (
//               <>
//                 <Nav.Link as={Link} to="/about">О себе</Nav.Link>
//               </>
//             )}
//           </Nav>
//           <div className="d-flex align-items-center">
//             <ThemeToggle />
//             {isAuthenticated && <UserProfile />}
//           </div>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;


// src/components/Header.jsx
import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import UserProfile from './auth/UserProfile';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

const Header = ({ onToggleMenu }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <div className="d-flex align-items-center">
          {isAuthenticated && (
            <Button 
              variant="outline-light" 
              className="me-2"
              onClick={onToggleMenu}
              aria-label="Toggle menu"
            >
              <FiMenu size={20} />
            </Button>
          )}
          <Navbar.Brand as={Link} to="/">Мое приложение</Navbar.Brand>
        </div>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <Nav.Link as={Link} to="/about">О себе</Nav.Link>
            )}
          </Nav>
          <div className="d-flex align-items-center">
            <ThemeToggle />
            {isAuthenticated && <UserProfile />}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;