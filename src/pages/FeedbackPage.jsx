// import React, { useEffect } from 'react';
// import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
// import { useAuth } from '../context/AuthContext';
// import { useTheme } from '../context/ThemeContext';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchFeedback, createFeedback } from '../store/slices/feedbackSlice';
// import FeedbackTable from '../components/admin/FeedbackTable.jsx'; // Новый компонент для таблицы

// const FeedbackPage = () => {
//   const { user } = useAuth();
//   const { isDark } = useTheme();
//   const dispatch = useDispatch();
  
//   const {
//     items: feedbackList,
//     status,
//     error
//   } = useSelector((state) => state.feedback);

//   const [newFeedback, setNewFeedback] = React.useState('');

//   // Загрузка отзывов
//   useEffect(() => {
//     dispatch(fetchFeedback());
//   }, [dispatch]);

//   // Отправка отзыва
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!newFeedback.trim()) return;

//     const feedbackData = {
//       author: user?.name || 'Аноним',
//       authorEmail: user?.email || null,
//       text: newFeedback,
//       timestamp: new Date().toISOString()
//     };

//     try {
//       await dispatch(createFeedback(feedbackData)).unwrap();
//       setNewFeedback('');
//     } catch (err) {
//       console.error('Ошибка при отправке:', err);
//     }
//   };

//   // Для админов - версия с таблицей
//   if (user?.role === 'admin') {
//     return (
//       <Card className={`mt-4 ${isDark ? 'bg-secondary text-white' : ''}`}>
//         <Card.Body>
//           <Card.Title>Управление отзывами (админ)</Card.Title>
          
//           {error && (
//             <Alert variant="danger" onClose={() => dispatch(fetchFeedback())} dismissible>
//               {error}
//             </Alert>
//           )}

//           <FeedbackTable 
//             feedback={feedbackList} 
//             loading={status === 'loading'}
//             isDark={isDark}
//           />
//         </Card.Body>
//       </Card>
//     );
//   }

//   // Для обычных пользователей - версия только для чтения
//   return (
//     <Card className={`mt-4 ${isDark ? 'bg-secondary text-white' : ''}`}>
//       <Card.Body>
//         <Card.Title>Обратная связь</Card.Title>

//         {error && (
//           <Alert variant="danger" onClose={() => dispatch(fetchFeedback())} dismissible>
//             {error}
//           </Alert>
//         )}

//         {user ? (
//           <>
//             <Form onSubmit={handleSubmit} className="mb-4">
//               <Form.Group controlId="feedbackText">
//                 <Form.Label>Ваш отзыв</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   value={newFeedback}
//                   onChange={(e) => setNewFeedback(e.target.value)}
//                   placeholder="Поделитесь вашим мнением..."
//                   className={isDark ? 'bg-dark text-white' : ''}
//                   disabled={status === 'loading'}
//                 />
//               </Form.Group>
//               <Button
//                 variant={isDark ? 'light' : 'primary'}
//                 type="submit"
//                 disabled={status === 'loading' || !newFeedback.trim()}
//                 className="mt-2"
//               >
//                 {status === 'loading' ? <Spinner size="sm" /> : 'Отправить'}
//               </Button>
//             </Form>

//             <div className={`feedback-list ${isDark ? 'dark' : ''}`}>
//               <h5>Последние отзывы</h5>
//               {status === 'loading' && feedbackList.length === 0 ? (
//                 <Spinner animation="border" />
//               ) : (
//                 feedbackList.map((item) => (
//                   <div key={item.id} className="feedback-item">
//                     <div className="feedback-header">
//                       <strong>{item.author}</strong>
//                       <small>
//                         {new Date(item.timestamp).toLocaleDateString()}
//                       </small>
//                     </div>
//                     <div className="feedback-text">{item.text}</div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </>
//         ) : (
//           <Alert variant="info">Чтобы оставить отзыв, пожалуйста, войдите в систему.</Alert>
//         )}
//       </Card.Body>
//     </Card>
//   );
// };

// export default FeedbackPage;

import React from 'react';
import { Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useGetFeedbackQuery, useAddFeedbackMutation } from '../store/slices/apiSlice';
import FeedbackForm from '../components/Feedback/FeedbackForm';
import FeedbackList from '../components/Feedback/FeedbackList';
import FeedbackTable from '../components/admin/FeedbackTable';
import Spinner from '../components/Spinner';

const FeedbackPage = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  
  // RTK Query hooks
  const { 
    data: feedbackList = [], 
    isLoading, 
    isError, 
    error 
  } = useGetFeedbackQuery();
  
  const [addFeedback, { isLoading: isAdding }] = useAddFeedbackMutation();

  // Обработчик отправки формы
  const handleSubmit = async (data) => {
    try {
      const feedbackData = {
        ...data,
        author: user?.name || 'Аноним',
        authorEmail: user?.email || null,
        timestamp: new Date().toISOString()
      };
      await addFeedback(feedbackData).unwrap();
    } catch (err) {
      console.error('Ошибка при отправке:', err);
    }
  };

  // Для админов - версия с таблицей
  if (user?.role === 'admin') {
    return (
      <Card className={`mt-4 ${isDark ? 'bg-secondary text-white' : ''}`}>
        <Card.Body>
          <Card.Title>Управление отзывами (админ)</Card.Title>
          
          {isError && (
            <Alert variant="danger" dismissible>
              {error?.data?.message || 'Ошибка загрузки отзывов'}
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

  // Для обычных пользователей
  return (
    <Card className={`mt-4 ${isDark ? 'bg-secondary text-white' : ''}`}>
      <Card.Body>
        <Card.Title>Обратная связь</Card.Title>

        {isError && (
          <Alert variant="danger" dismissible>
            {error?.data?.message || 'Ошибка загрузки отзывов'}
          </Alert>
        )}

        {user ? (
          <>
            <FeedbackForm 
              onSubmit={handleSubmit} 
              isSubmitting={isAdding}
              isDark={isDark}
            />
            
            <div className="mt-4">
              <h5>Последние отзывы</h5>
              {isLoading ? (
                <Spinner animation="border" />
              ) : (
                <FeedbackList 
                  feedbacks={feedbackList} 
                  isDark={isDark}
                />
              )}
            </div>
          </>
        ) : (
          <Alert variant="info">
            Чтобы оставить отзыв, пожалуйста, войдите в систему.
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default FeedbackPage;