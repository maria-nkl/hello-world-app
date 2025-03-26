import React from 'react' // Основная библиотека React
import ReactDOM from 'react-dom/client' // Библиотека для рендеринга React в DOM
import 'bootstrap/dist/css/bootstrap.min.css' // Стили Bootstrap (минифицированная версия)
import App from './App' // Наш главный компонент приложения
import './index.css' // Дополнительные кастомные стили

// Создаем корневой элемент для рендеринга React-приложения
// document.getElementById('root') - находим элемент с id="root" в index.html
const root = ReactDOM.createRoot(document.getElementById('root'))

// Рендерим наше приложение в корневой элемент
root.render(
  // React.StrictMode - специальный компонент для выявления потенциальных проблем
  // Включает дополнительные проверки и предупреждения в development-режиме
  <React.StrictMode>
    {/* Главный компонент нашего приложения */}
    <App />
  </React.StrictMode>
)