// Импортируем необходимые компоненты и хуки
import React, { useState, useEffect } from 'react';
import { Card, Form, Button, ListGroup, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; // Хук для доступа к данным аутентификации
import { useTheme } from '../context/ThemeContext'; // Хук для доступа к теме приложения

const Feedback = () => {
  // Получаем данные пользователя и текущую тему через контексты
  const { user } = useAuth();
  const { isDark } = useTheme();

  // Состояния компонента:
  const [feedbackList, setFeedbackList] = useState([]); // Список отзывов
  const [newFeedback, setNewFeedback] = useState(''); // Текст нового отзыва
  const [isLoading, setIsLoading] = useState(false); // Флаг загрузки
  const [error, setError] = useState(null); // Ошибки

  // Эффект для загрузки отзывов при монтировании компонента
  useEffect(() => {
    const loadFeedback = async () => {
      try {
        setIsLoading(true);
        // Имитация загрузки отзывов с сервера
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
  }, []); // Пустой массив зависимостей - выполняется один раз при монтировании

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return; // Проверка на пустой отзыв

    try {
      setIsLoading(true);
      // Имитация задержки сети при отправке
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Создаем новый отзыв
      const newItem = {
        id: Date.now(), // Уникальный ID на основе времени
        author: user?.name || 'Аноним', // Имя пользователя или "Аноним"
        text: newFeedback,
        timestamp: new Date().toLocaleDateString() // Текущая дата
      };

      // Добавляем новый отзыв в начало списка
      setFeedbackList([newItem, ...feedbackList]);
      setNewFeedback(''); // Очищаем поле ввода
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
        
        {/* Форма для отправки отзыва (показывается только авторизованным) */}
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

        {/* Список существующих отзывов */}
        <Card.Subtitle className="mb-3">Последние отзывы</Card.Subtitle>
        
        {/* Отображение ошибок */}
        {error && <Alert variant="danger">{error}</Alert>}
        
        {/* Индикатор загрузки или список отзывов */}
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