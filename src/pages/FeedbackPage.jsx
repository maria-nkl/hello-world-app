import React, { useState } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useGetFeedbackQuery, useAddFeedbackMutation } from '../store/feedbackApi';
import FeedbackTable from '../components/admin/FeedbackTable.jsx';

const FeedbackPage = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [newFeedback, setNewFeedback] = useState('');
  
  const {data: feedbackList = [], isLoading, isError, error, refetch} = useGetFeedbackQuery();
  
  const [addFeedback, { isLoading: isAdding }] = useAddFeedbackMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    const feedbackData = {
      author: user?.name || 'Аноним',
      authorEmail: user?.email || null,
      text: newFeedback,
      timestamp: new Date().toISOString()
    };

    try {
      await addFeedback(feedbackData).unwrap();
      setNewFeedback('');
      refetch(); // Обновляем список после добавления
    } catch (err) {
      console.error('Ошибка при отправке:', err);
    }
  };

  if (user?.role === 'admin') {
    return (
      <Card className={`mt-4 ${isDark ? 'bg-secondary text-white' : ''}`}>
        <Card.Body>
          <Card.Title>Управление отзывами (админ)</Card.Title>
          
          {isError && (
            <Alert variant="danger" onClose={refetch} dismissible>
              {error?.message || 'Ошибка загрузки отзывов'}
            </Alert>
          )}

          <FeedbackTable 
            feedback={feedbackList} 
            loading={isLoading}
            isDark={isDark}
          />
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className={`mt-4 ${isDark ? 'bg-secondary text-white' : ''}`}>
      <Card.Body>
        <Card.Title>Обратная связь</Card.Title>

        {isError && (
          <Alert variant="danger" onClose={refetch} dismissible>
            {error?.message || 'Ошибка загрузки отзывов'}
          </Alert>
        )}

        {user ? (
          <>
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
                  disabled={isAdding}
                />
              </Form.Group>
              <Button
                variant={isDark ? 'light' : 'primary'}
                type="submit"
                disabled={isAdding || !newFeedback.trim()}
                className="mt-2"
              >
                {isAdding ? <Spinner size="sm" /> : 'Отправить'}
              </Button>
            </Form>

            <div className={`feedback-list ${isDark ? 'dark' : ''}`}>
              <h5>Последние отзывы</h5>
              {isLoading ? (
                <Spinner animation="border" />
              ) : feedbackList.length > 0 ? (
                feedbackList.map((item) => (
                  <div key={item.id} className="feedback-item mb-3 p-2 border rounded">
                    <div className="d-flex justify-content-between">
                      <strong>{item.author || 'Аноним'}</strong>
                      <small className="text-muted">
                        {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Дата не указана'}
                      </small>
                    </div>
                    <div className="feedback-text mt-1">{item.text}</div>
                  </div>
                ))
              ) : (
                <Alert variant="info">Нет отзывов для отображения</Alert>
              )}
            </div>
          </>
        ) : (
          <Alert variant="info">Чтобы оставить отзыв, пожалуйста, войдите в систему.</Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default FeedbackPage;