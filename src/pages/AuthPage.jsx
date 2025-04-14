import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import AuthForm from '../components/auth/AuthForm';

const AuthPage = () => {
  const { isDark } = useTheme();

  return (
    <Container className={`d-flex justify-content-center align-items-center min-vh-100 ${isDark ? 'bg-dark' : 'bg-light'}`}>
      <Card className={`w-100 ${isDark ? 'bg-secondary text-white' : ''}`} style={{ maxWidth: '500px' }}>
        <Card.Body>
          <AuthForm />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AuthPage;