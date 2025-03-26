import React from "react"; // Основная библиотека React
import Container from "./Container"; // Импорт компонента Container из локального файла

// Создаем компонент Header (шапка сайта)
const Header = () => {
  return (
    // HTML-тег header с классами стилей:
    // bg-dark - темный фон
    // text-white - белый текст
    // p-3 - отступы (padding) со всех сторон
    <header className="bg-dark text-white p-3">
      {/* Использую свой Container вместо стандартного */}
      <Container>
        {/* Заголовок h1 без нижнего отступа (mb-0) */}
        <h1 className="mb-0">Лабораторные работы</h1>
      </Container>
    </header>
  );
};

// Экспортируем компонент для использования в других частях приложения
export default Header;