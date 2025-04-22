// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Button, Form } from 'react-bootstrap';
// import { useCallback } from 'react';

// const FeedbackForm = ({ onSubmit }) => {
//   const { register, handleSubmit, reset, formState: { errors } } = useForm();

//   const handleFeedbackSubmit = useCallback((data) => {
//     onSubmit(data);
//     reset();
//   }, [onSubmit, reset]);

//   return (
//     <Form onSubmit={handleSubmit(handleFeedbackSubmit)}>
//       <Form.Group className="mb-3">
//         <Form.Label>Ваше имя</Form.Label>
//         <Form.Control
//           {...register('name', { required: 'Имя обязательно' })}
//           isInvalid={!!errors.name}
//         />
//       </Form.Group>
//       <Form.Group className="mb-3">
//         <Form.Label>Отзыв</Form.Label>
//         <Form.Control
//           as="textarea"
//           rows={3}
//           {...register('feedback', { required: 'Отзыв обязателен' })}
//           isInvalid={!!errors.feedback}
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Отправить
//       </Button>
//     </Form>
//   );
// };

// export default FeedbackForm;

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Spinner } from 'react-bootstrap';

const FeedbackForm = ({ onSubmit, isSubmitting, isDark }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)} className="mb-4">
      <Form.Group className="mb-3">
        <Form.Label>Ваше имя</Form.Label>
        <Form.Control
          {...register('name', { required: 'Имя обязательно' })}
          isInvalid={!!errors.name}
          className={isDark ? 'bg-dark text-white' : ''}
          placeholder={isSubmitting ? 'Отправка...' : 'Ваше имя'}
          disabled={isSubmitting}
        />
        {errors.name && (
          <Form.Control.Feedback type="invalid">
            {errors.name.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Отзыв</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          {...register('feedback', { 
            required: 'Отзыв обязателен',
            minLength: {
              value: 10,
              message: 'Минимум 10 символов'
            }
          })}
          isInvalid={!!errors.feedback}
          className={isDark ? 'bg-dark text-white' : ''}
          placeholder={isSubmitting ? 'Отправка...' : 'Ваш отзыв...'}
          disabled={isSubmitting}
        />
        {errors.feedback && (
          <Form.Control.Feedback type="invalid">
            {errors.feedback.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      
      <Button 
        variant={isDark ? 'light' : 'primary'} 
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner as="span" size="sm" animation="border" /> Отправка...
          </>
        ) : 'Отправить'}
      </Button>
    </Form>
  );
};

export default FeedbackForm;