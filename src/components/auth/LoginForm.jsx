// Импортируем необходимые компоненты и хуки из библиотек
import React from 'react';
import { useForm } from 'react-hook-form'; // Хук для управления формой
import { Button, Form, Alert } from 'react-bootstrap'; // UI компоненты Bootstrap
import { useAuth } from '../../context/AuthContext'; // Кастомный хук для работы с аутентификацией
import { useNavigate } from 'react-router-dom'; // Хук для навигации

// Компонент формы входа
const LoginForm = () => {
  // Инициализация хука useForm для управления формой:
  // - register: регистрирует поля формы
  // - handleSubmit: обрабатывает отправку формы
  // - formState.errors: содержит ошибки валидации
  // - setError: метод для установки ошибок вручную
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setError 
  } = useForm();

  const { login } = useAuth(); // Получаем метод login из контекста аутентификации
  const navigate = useNavigate(); // Хук для программной навигации

  // Функция обработки отправки формы
  const onSubmit = async (data) => {
    try {
      await login(data); // Вызываем метод входа из контекста аутентификации
      navigate('/'); // После успешного входа перенаправляем на главную страницу
    } catch (error) {
      // Если произошла ошибка, устанавливаем её в состояние формы
      setError('apiError', {
        type: 'manual',
        message: error.message || 'Ошибка входа' // Показываем сообщение об ошибке или стандартное
      });
    }
  };

  // Рендерим форму
  return (
    // Форма с обработчиком onSubmit, который вызывает handleSubmit с нашей функцией
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Группа поля для email */}
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        {/* Поле ввода email с валидацией */}
        <Form.Control
          type="email"
          {...register('email', { required: 'Email обязателен' })} // Регистрируем поле с обязательной валидацией
          isInvalid={!!errors.email} // Показываем ошибку, если она есть
        />
        {/* Компонент для отображения ошибки */}
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Группа поля для пароля */}
      <Form.Group className="mb-3">
        <Form.Label>Пароль</Form.Label>
        {/* Поле ввода пароля с валидацией */}
        <Form.Control
          type="password"
          {...register('password', { required: 'Пароль обязателен' })} // Регистрируем поле с обязательной валидацией
          isInvalid={!!errors.password} // Показываем ошибку, если она есть
        />
        {/* Компонент для отображения ошибки */}
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Кнопка отправки формы */}
      <Button variant="primary" type="submit">
        Войти
      </Button>

      {/* Блок для отображения API ошибок (например, неверные учетные данные) */}
      {errors.apiError && (
        <Alert variant="danger" className="mt-3">
          {errors.apiError.message}
        </Alert>
      )}
    </Form>
  );
};

export default LoginForm;