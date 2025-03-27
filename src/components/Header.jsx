import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Импортируем хук для работы с темой
import ThemeToggle from './ThemeToggle'; // Импортируем компонент переключателя темы

// Компонент Header (шапка сайта)
const Header = () => {
  // Получаем текущую тему через хук useTheme()
  // isDark - true для темной темы, false для светлой
  const { isDark } = useTheme();

  return (
    // Шапка сайта с динамическими классами:
    // - p-3: отступы внутри шапки
    // - bg-dark: темный фон (если isDark = true)
    // - bg-primary: синий фон (если isDark = false)
    // - text-white: белый текст (не зависит от темы)
    <header className={`p-3 ${isDark ? 'bg-dark' : 'bg-primary'} text-white`}>
      
      {/* Контейнер с flex-разметкой: */}
      {/* - container: ограничивает ширину контента */}
      {/* - d-flex: гибкое расположение элементов */}
      {/* - justify-content-between: равномерное распределение */}
      {/* - align-items-center: вертикальное выравнивание по центру */}
      <div className="container d-flex justify-content-between align-items-center">
        
        {/* Заголовок сайта */}
        <h1 className="m-0">Лабораторные работы</h1>
        
        {/* Компонент переключателя тем */}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;