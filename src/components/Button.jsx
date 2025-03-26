import React from "react";
// Импорт кнопки из библиотеки react-bootstrap с переименованием
import { Button as BootstrapButton } from "react-bootstrap";


// пропс - это механизм для передачи данных от родительского компонента к дочернему
// Создание функционального компонента Button
const Button = ({ 
  children,          // содержимое кнопки
  onClick,           // функция-обработчик клика
  className = "",    // Пропс для CSS-классов (по умолчанию пусьая строка)
  style              // Пропс для inline-стилей
}) => {
  return (
    // Используем BootstrapButton с переданными пропсами
    <BootstrapButton 
      onClick={onClick}                 // Передаем обработчик клика
      className={`px-3 ${className}`}   // Шаблонная строка для классов
      style={style}                     // Передаем inline-стили
    >
      {children}                   {/* Вставляем дочерние элементы */}
    </BootstrapButton>
  );
};

// Экспорт компонента по умолчанию
export default Button;