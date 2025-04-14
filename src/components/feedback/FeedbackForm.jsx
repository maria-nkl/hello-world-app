import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { useCallback } from 'react';

const FeedbackForm = ({ onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleFeedbackSubmit = useCallback((data) => {
    onSubmit(data);
    reset();
  }, [onSubmit, reset]);

  return (
    <Form onSubmit={handleSubmit(handleFeedbackSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Ваше имя</Form.Label>
        <Form.Control
          {...register('name', { required: 'Имя обязательно' })}
          isInvalid={!!errors.name}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Отзыв</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          {...register('feedback', { required: 'Отзыв обязателен' })}
          isInvalid={!!errors.feedback}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Отправить
      </Button>
    </Form>
  );
};

export default FeedbackForm;