import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setLoginError(null); // Сбрасываем предыдущие ошибки
      const success = await login(data);
      if (success) {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
  
      // Проверяем код ошибки
      if (error.code === 'BLOCKED_ACCOUNT') {
        setLoginError('Вас заблокировали');
      } else if (error.message === 'Неверные учетные данные') {
        setLoginError('Неверный email или пароль');
      } else {
        setLoginError('Вас заблокировали');
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          {...register('email', { required: 'Обязательное поле' })}
          isInvalid={!!errors.email}
          disabled={authLoading}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          {...register('password', { required: 'Обязательное поле' })}
          isInvalid={!!errors.password}
          disabled={authLoading}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>
      {loginError && (
        <Alert variant="danger" className="mt-3">
          {loginError} {/* Выводим сообщение об ошибке */}
        </Alert>
      )}
      <Button 
        type="submit" 
        variant="primary" 
        disabled={authLoading}
      >
        {authLoading ? (
          <Spinner as="span" size="sm" animation="border" />
        ) : 'Войти'}
      </Button>
    </Form>
  );
};

export default LoginForm;