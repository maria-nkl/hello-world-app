// Импортируем необходимые зависимости
import React from 'react'; // Основная библиотека React
import { useTheme } from '../context/ThemeContext'; // Хук для доступа к теме
import { Button } from 'react-bootstrap'; // Компонент кнопки из Bootstrap

// Компонент ThemeToggle - переключатель темы (дневная/ночная)
const ThemeToggle = () => {
  // Получаем текущее состояние темы и функцию для её переключения
  // isDark - true (темная тема) или false (светлая тема)
  // toggleTheme - функция переключения между темами
  const { isDark, toggleTheme } = useTheme();

  // Возвращаем кнопку переключателя
  return (
    <Button 
      variant={isDark ? 'light' : 'dark'} // Динамический стиль кнопки:
      // - light (светлая) для темной темы
      // - dark (темная) для светлой темы
      onClick={toggleTheme} // При клике вызываем функцию переключения
    >
      {/* Текст и иконка меняются в зависимости от темы */}
      {isDark ? '☀️ Светлая тема' : '🌙 Темная тема'}
    </Button>
  );
};

// Экспортируем компонент для использования в других частях приложения
export default ThemeToggle;