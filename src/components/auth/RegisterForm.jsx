import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const RegisterForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    clearErrors
  } = useForm();

  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const password = watch("password", "");

  const onSubmit = async (formData) => {
    try {
      clearErrors();
      
      // 1. Вызов функции регистрации из контекста
      const result = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // 2. Обработка успешной регистрации
      if (result.success) {
        onSuccess?.();
        navigate('/');
      }
    } catch (error) {
      // 3. Обработка ошибок
      setError('root.serverError', {
        type: 'manual',
        message: error.message || 'Ошибка регистрации. Попробуйте позже.'
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Поле "Имя" */}
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Имя</Form.Label>
        <Form.Control
          type="text"
          {...register('name', {
            required: 'Поле обязательно для заполнения',
            minLength: {
              value: 2,
              message: 'Минимум 2 символа'
            }
          })}
          isInvalid={!!errors.name}
          placeholder="Введите ваше имя"
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Поле "Email" */}
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          {...register('email', {
            required: 'Поле обязательно для заполнения',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Введите корректный email'
            }
          })}
          isInvalid={!!errors.email}
          placeholder="example@mail.com"
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Поле "Пароль" */}
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          {...register('password', {
            required: 'Поле обязательно для заполнения',
            minLength: {
              value: 6,
              message: 'Минимум 6 символов'
            }
          })}
          isInvalid={!!errors.password}
          placeholder="Не менее 6 символов"
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Поле "Подтверждение пароля" */}
      <Form.Group className="mb-4" controlId="confirmPassword">
        <Form.Label>Подтвердите пароль</Form.Label>
        <Form.Control
          type="password"
          {...register('confirmPassword', {
            required: 'Подтвердите пароль',
            validate: value =>
              value === password || 'Пароли не совпадают'
          })}
          isInvalid={!!errors.confirmPassword}
          placeholder="Повторите пароль"
        />
        <Form.Control.Feedback type="invalid">
          {errors.confirmPassword?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Кнопка отправки */}
      <div className="d-grid gap-2">
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Регистрируем...
            </>
          ) : (
            'Зарегистрироваться'
          )}
        </Button>
      </div>

      {/* Вывод общих ошибок */}
      {errors.root?.serverError && (
        <Alert variant="danger" className="mt-3">
          {errors.root.serverError.message}
        </Alert>
      )}
    </Form>
  );
};

RegisterForm.propTypes = {
  onSuccess: PropTypes.func
};

export default RegisterForm;