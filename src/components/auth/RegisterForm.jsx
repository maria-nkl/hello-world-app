import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('root'); // Сбрасываем предыдущие ошибки
    
    try {
      await registerUser(data);
      navigate('/', { replace: true });
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error.message
      });
      
      // Особо отмечаем ошибку email
      if (error.message.includes('email')) {
        setError('email', { type: 'manual', message: error.message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Имя</Form.Label>
        <Form.Control
          {...register('name', { required: 'Обязательное поле' })}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          {...register('email', { 
            required: 'Обязательное поле',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Некорректный email'
            }
          })}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          {...register('password', { 
            required: 'Обязательное поле',
            minLength: {
              value: 6,
              message: 'Минимум 6 символов'
            }
          })}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {errors.root && (
        <Alert variant="danger" className="mt-3">
          {errors.root.message}
        </Alert>
      )}

      <Button 
        type="submit" 
        variant="primary" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner as="span" size="sm" animation="border" className="me-2" />
            Регистрация...
          </>
        ) : 'Зарегистрироваться'}
      </Button>
    </Form>
  );
};

export default RegisterForm;