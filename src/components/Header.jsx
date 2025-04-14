import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import UserProfile from './auth/UserProfile';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Мое приложение</Navbar.Brand>
        <div className="d-flex align-items-center">
          <ThemeToggle />
          {isAuthenticated && <UserProfile />}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;