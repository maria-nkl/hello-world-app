// Импортируем React и хук для работы с темой
import React from 'react';
import { useTheme } from '../context/ThemeContext';

// Компонент Footer (подвал сайта)
const Footer = () => {
  // Получаем текущую тему через кастомный хук useTheme()
  // isDark - булево значение (true для темной темы, false для светлой)
  const { isDark } = useTheme();

  // Возвращаем разметку подвала
  return (
    // Тег footer с динамическими классами:
    // - py-3: вертикальные отступы (padding)
    // - mt-auto: прижимает футер к низу страницы
    // - bg-dark/text-white: темный фон и белый текст (если isDark = true)
    // - bg-light/text-dark: светлый фон и темный текст (если isDark = false)
    <footer className={`py-3 mt-auto ${isDark ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      
      {/* Контейнер для содержимого подвала */}
      <div className="container text-center">
        {/* Текст копирайта с текущим годом */}
        © {new Date().getFullYear()} Лабораторные работы
      </div>
    </footer>
  );
};

// Экспортируем компонент для использования в других частях приложения
export default Footer;