import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <Container className={`text-center mt-5 ${isDark ? 'text-white' : ''}`}>
      <h1>404 - Страница не найдена</h1>
      <p className="mb-4">Запрошенная страница не существует</p>
      <Button 
        onClick={() => navigate('/')} 
        variant={isDark ? 'light' : 'primary'}
      >
        Вернуться на главную
      </Button>
    </Container>
  );
};

export default NotFoundPage;