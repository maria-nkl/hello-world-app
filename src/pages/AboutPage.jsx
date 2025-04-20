// src/pages/AboutPage.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

const AboutPage = () => {
  const { user: authUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!authUser?.email) return;
        
        const response = await axios.get('/db.json');
        const users = response.data.users;
        const foundUser = users.find(u => u.email === authUser.email);
        
        if (foundUser) {
          setUserData(foundUser);
        } else {
          setError('Пользователь не найден');
        }
      } catch (err) {
        setError('Ошибка при загрузке данных');
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authUser?.email]);

  return (
    <Container className="my-4">
      <h1>О себе</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Card className="shadow-sm">
        <Card.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Загрузка данных...</p>
            </div>
          ) : (
            <>
              <Card.Title>Личная информация</Card.Title>
              <div className="mb-3">
                <strong>ID:</strong> {userData?.id}
              </div>
              <div className="mb-3">
                <strong>Имя:</strong> {userData?.name || 'Не указано'}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {userData?.email || 'Не указан'}
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AboutPage;