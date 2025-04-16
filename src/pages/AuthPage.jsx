import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';

const AuthPage = () => {
  const { isDark } = useTheme();
  const { isAuthenticated } = useAuth();

  // Если пользователь авторизован - редирект на главную
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

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