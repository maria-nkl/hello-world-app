// import React, { useState, useEffect } from 'react';
// import { Card, Form, Button, ListGroup, Alert, Spinner } from 'react-bootstrap';
// import { useAuth } from '../context/AuthContext';
// import { useTheme } from '../context/ThemeContext';
// import { getFeedback, addFeedback, deleteFeedback } from '../api/feedback';

// const Feedback = () => {
//   const { user } = useAuth();
//   const { isDark } = useTheme();

//   const [feedbackList, setFeedbackList] = useState([]);
//   const [newFeedback, setNewFeedback] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Загрузка отзывов при монтировании компонента
//   useEffect(() => {
//     const loadFeedback = async () => {
//       try {
//         setIsLoading(true);
//         const feedback = await getFeedback(); // Загружаем отзывы с сервера
//         setFeedbackList(feedback);
//       } catch (err) {
//         setError('Не удалось загрузить отзывы');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadFeedback();
//   }, []);

//   // Обработчик отправки формы
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!newFeedback.trim()) return;

//     try {
//       setIsLoading(true);

//       // Создаем новый отзыв
//       const newItem = {
//         author: user?.name || 'Аноним',
//         authorEmail: user?.email || null, // Добавляем email автора
//         text: newFeedback,
//         timestamp: new Date().toISOString()
//       };

//       // Отправляем отзыв на сервер
//       const addedFeedback = await addFeedback(newItem);

//       // Обновляем локальный список отзывов
//       setFeedbackList([addedFeedback, ...feedbackList]);
//       setNewFeedback('');
//     } catch (err) {
//       setError('Ошибка при отправке отзыва');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Обработчик удаления отзыва
//   const handleDelete = async (feedbackId) => {
//     try {
//       setIsLoading(true);

//       // Удаляем отзыв с сервера
//       await deleteFeedback(feedbackId);

//       // Удаляем отзыв из локального состояния
//       setFeedbackList(feedbackList.filter((item) => item.id !== feedbackId));
//     } catch (err) {
//       setError('Ошибка при удалении отзыва');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card className={`mt-4 ${isDark ? 'bg-secondary text-white' : ''}`}>
//       <Card.Body>
//         <Card.Title>Обратная связь</Card.Title>

//         {/* Форма отправки отзыва */}
//         {user ? (
//           <Form onSubmit={handleSubmit} className="mb-4">
//             <Form.Group controlId="feedbackText">
//               <Form.Label>Ваш отзыв</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 value={newFeedback}
//                 onChange={(e) => setNewFeedback(e.target.value)}
//                 placeholder="Поделитесь вашим мнением..."
//                 className={isDark ? 'bg-dark text-white' : ''}
//               />
//             </Form.Group>
//             <Button
//               variant={isDark ? 'light' : 'primary'}
//               type="submit"
//               disabled={isLoading || !newFeedback.trim()}
//               className="mt-2"
//             >
//               {isLoading ? <Spinner size="sm" /> : 'Отправить'}
//             </Button>
//           </Form>
//         ) : (
//           <Alert variant="info">Чтобы оставить отзыв, пожалуйста, войдите в систему.</Alert>
//         )}

//         {/* Список существующих отзывов */}
//         <Card.Subtitle className="mb-3">Последние отзывы</Card.Subtitle>
//         {error && <Alert variant="danger">{error}</Alert>}
//         {isLoading && feedbackList.length === 0 ? (
//           <Spinner animation="border" />
//         ) : (
//           <ListGroup>
//             {feedbackList.map((item) => (
//               <ListGroup.Item key={item.id} className={isDark ? 'bg-dark text-white' : ''}>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <strong>{item.author}</strong>
//                     <small className="text-muted ms-2">{new Date(item.timestamp).toLocaleDateString()}</small>
//                   </div>
//                   {user?.email === item.authorEmail && ( // Проверка по email
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       onClick={() => handleDelete(item.id)} // Функция удаления отзыва
//                       disabled={isLoading}
//                     >
//                       Удалить
//                     </Button>
//                   )}
//                 </div>
//                 <div className="mt-2">{item.text}</div>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         )}
//       </Card.Body>
//     </Card>
//   );
// };

// export default Feedback;

import React, { useEffect } from 'react';
import { Card, Form, Button, ListGroup, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeedback, createFeedback, removeFeedback } from '../store/slices/feedbackSlice';

const FeedbackPage = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  
  const {
    items: feedbackList,
    status,
    error,
    deletingId
  } = useSelector((state) => state.feedback);

  const [newFeedback, setNewFeedback] = React.useState('');

  // Загрузка отзывов
  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  // Отправка отзыва
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
      await dispatch(createFeedback(feedbackData)).unwrap();
      setNewFeedback('');
    } catch (err) {
      console.error('Ошибка при отправке:', err);
    }
  };

  // Удаление отзыва
  const handleDelete = (feedbackId) => {
    dispatch(removeFeedback(feedbackId));
  };

  return (
    <Card className={`mt-4 ${isDark ? 'bg-secondary text-white' : ''}`}>
      <Card.Body>
        <Card.Title>Обратная связь</Card.Title>

        {error && (
          <Alert variant="danger" onClose={() => dispatch(fetchFeedback())} dismissible>
            {error}
          </Alert>
        )}

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
                disabled={status === 'loading'}
              />
            </Form.Group>
            <Button
              variant={isDark ? 'light' : 'primary'}
              type="submit"
              disabled={status === 'loading' || !newFeedback.trim()}
              className="mt-2"
            >
              {status === 'loading' ? <Spinner size="sm" /> : 'Отправить'}
            </Button>
          </Form>
        ) : (
          <Alert variant="info">Чтобы оставить отзыв, пожалуйста, войдите в систему.</Alert>
        )}

        <Card.Subtitle className="mb-3">Последние отзывы</Card.Subtitle>
        
        {status === 'loading' && feedbackList.length === 0 ? (
          <Spinner animation="border" />
        ) : (
          <ListGroup>
            {feedbackList.map((item) => (
              <ListGroup.Item key={item.id} className={isDark ? 'bg-dark text-white' : ''}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.author}</strong>
                    <small className="text-muted ms-2">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </small>
                  </div>
                  {user?.email === item.authorEmail && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                    >
                      {deletingId === item.id ? (
                        <Spinner as="span" size="sm" animation="border" />
                      ) : (
                        'Удалить'
                      )}
                    </Button>
                  )}
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

export default FeedbackPage;