import React, { useState, useEffect } from 'react';
import { Card, Form, Button, ListGroup, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Feedback = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка существующих отзывов
  useEffect(() => {
    const loadFeedback = async () => {
      try {
        setIsLoading(true);
        const mockFeedback = [
          { id: 1, author: 'Алексей', text: 'Отличный сервис!', timestamp: '2023-05-15' },
          { id: 2, author: 'Мария', text: 'Быстро и качественно', timestamp: '2023-05-10' }
        ];
        setFeedbackList(mockFeedback);
      } catch (err) {
        setError('Не удалось загрузить отзывы');
      } finally {
        setIsLoading(false);
      }
    };

    loadFeedback();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    try {
      setIsLoading(true);
      // Имитация API-запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newItem = {
        id: Date.now(),
        author: user?.name || 'Аноним',
        text: newFeedback,
        timestamp: new Date().toLocaleDateString()
      };

      setFeedbackList([newItem, ...feedbackList]);
      setNewFeedback('');
    } catch (err) {
      setError('Ошибка при отправке отзыва');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`mt-4 ${isDark ? 'bg-secondary text-white' : ''}`}>
      <Card.Body>
        <Card.Title>Обратная связь</Card.Title>
        
        {/* Форма отправки отзыва */}
        {user ? (
          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group controlId="feedbackText">
              <Form.Label>Ваш отзыв</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                placeholder="Поделитесь вашим мнением..."
                className={isDark ? 'bg-dark text-white' : ''}
              />
            </Form.Group>
            <Button 
              variant={isDark ? 'light' : 'primary'} 
              type="submit"
              disabled={isLoading || !newFeedback.trim()}
              className="mt-2"
            >
              {isLoading ? <Spinner size="sm" /> : 'Отправить'}
            </Button>
          </Form>
        ) : (
          <Alert variant="info">
            Чтобы оставить отзыв, пожалуйста, войдите в систему.
          </Alert>
        )}

        {/* Список отзывов */}
        <Card.Subtitle className="mb-3">Последние отзывы</Card.Subtitle>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        {isLoading && feedbackList.length === 0 ? (
          <Spinner animation="border" />
        ) : (
          <ListGroup>
            {feedbackList.map((item) => (
              <ListGroup.Item 
                key={item.id} 
                className={isDark ? 'bg-dark text-white' : ''}
              >
                <div className="d-flex justify-content-between">
                  <strong>{item.author}</strong>
                  <small className="text-muted">{item.timestamp}</small>
                </div>
                <div className="mt-2">{item.text}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default Feedback;