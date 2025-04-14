// Импорт необходимых зависимостей
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logoutSuccess } from '../store/authSlice';

// Создание кастомного хука useLoginState
export const useLoginState = () => {
  // Получаем функцию dispatch из Redux для отправки действий (actions)
  const dispatch = useDispatch();
  
  // Получаем текущее состояние isLoggedIn из Redux хранилища
  // useSelector подписывает компонент на изменение этого состояния
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  
  // Используем useEffect для побочных эффектов (работа с localStorage)
  useEffect(() => {
    // Этот код выполняется только при монтировании компонента ([] - пустой массив зависимостей)
    
    // Проверяем localStorage на наличие сохраненных данных аутентификации
    const savedAuth = localStorage.getItem('auth');
    
    // Если данные найдены
    if (savedAuth) {
      // Парсим JSON строку в объект JavaScript
      const { isLoggedIn, user } = JSON.parse(savedAuth);
      
      // Отправляем действие loginSuccess в Redux хранилище
      // Это обновит состояние и "войдет" пользователя в систему
      dispatch(loginSuccess(user));
    }
  }, [dispatch]); // Зависимость - dispatch, хотя он стабилен и не меняется

  // Возвращаем текущее состояние isLoggedIn
  // Компоненты, использующие этот хук, будут перерисовываться при его изменении
  return isLoggedIn;
};

// Это "крючок" (hook), который следит, вошел ли пользователь в систему или нет

// Он проверяет браузерное хранилище (localStorage) при загрузке страницы, чтобы восстановить данные входа

// Если в localStorage есть сохраненные данные, он автоматически входит пользователя

// Возвращает текущее состояние входа (true/false)