// Импортируем необходимые хуки и компоненты React
import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types'; // Для проверки типов пропсов
import { useNavigate } from 'react-router-dom'; // Хук для навигации

// Создаем контекст аутентификации, который будет доступен через useAuth()
export const AuthContext = createContext();

// Провайдер аутентификации - оборачивает приложение и предоставляет функционал аутентификации
export const AuthProvider = ({ children }) => {
  // Состояния:
  const [user, setUser] = useState(null); // Данные авторизованного пользователя
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Флаг аутентификации
  const [isLoading, setIsLoading] = useState(true); // Флаг загрузки
  const [authError, setAuthError] = useState(null); // Ошибки аутентификации
  const navigate = useNavigate(); // Хук для навигации

  // Эффект для проверки аутентификации при монтировании компонента
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Проверяем localStorage на наличие данных пользователя
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Ошибка проверки аутентификации:', error);
      } finally {
        setIsLoading(false); // В любом случае снимаем флаг загрузки
      }
    };

    checkAuth();
  }, []); // Пустой массив зависимостей - выполняется только при монтировании

  // Функция входа (useCallback для мемоизации и избежания лишних ререндеров)
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    setAuthError(null); // Сбрасываем предыдущие ошибки
    
    try {
      // Имитация API-запроса (в реальном приложении здесь будет fetch/axios)
      const response = await new Promise((resolve) => 
        setTimeout(() => resolve({ 
          data: { 
            user: { 
              id: '123', 
              email: credentials.email, 
              name: credentials.name || 'Пользователь' 
            } 
          } 
        }), 500) // Имитация задержки сети
      );

      // Сохраняем пользователя в localStorage и состоянии
      localStorage.setItem('auth_user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setIsAuthenticated(true);
      navigate('/'); // Перенаправляем на главную после успешного входа
    } catch (error) {
      setAuthError(error.message || 'Ошибка входа');
      throw error; // Пробрасываем ошибку для обработки в форме
    } finally {
      setIsLoading(false);
    }
  }, [navigate]); // Зависимость - navigate

  // Функция регистрации (аналогично login)
  const register = useCallback(async (userData) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      // Имитация API-запроса для регистрации
      const response = await new Promise((resolve) => 
        setTimeout(() => resolve({ 
          data: { 
            user: { 
              id: '456', 
              email: userData.email, 
              name: userData.name 
            } 
          } 
        }), 500)
      );

      // Автоматический вход после регистрации
      localStorage.setItem('auth_user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      setAuthError(error.message || 'Ошибка регистрации');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Функция выхода
  const logout = useCallback(() => {
    // Очищаем данные пользователя
    localStorage.removeItem('auth_user');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login'); // Перенаправляем на страницу входа
  }, [navigate]);

  // Мемоизированное значение контекста (оптимизация производительности)
  const contextValue = useMemo(() => ({
    user,
    isAuthenticated,
    isLoading,
    authError,
    login,
    register,
    logout,
    setAuthError
  }), [user, isAuthenticated, isLoading, authError, login, register, logout]);

  // Возвращаем провайдер контекста с дочерними элементами
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Проверка типов пропсов
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Кастомный хук для удобного доступа к контексту аутентификации
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};