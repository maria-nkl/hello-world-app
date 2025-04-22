import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { useAddFeedbackMutation } from '../../store/feedbackApi';

const FeedbackForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [addFeedback, { isLoading }] = useAddFeedbackMutation();

  const onSubmit = async (data) => {
    try {
      await addFeedback(data).unwrap();
      reset();
    } catch (error) {
      console.error('Failed to add feedback:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
      <Button variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? 'Отправка...' : 'Отправить'}
      </Button>
    </Form>
  );
};

export default FeedbackForm;