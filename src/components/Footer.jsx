import React from "react"; // Основная библиотека React
import Container from "./Container"; // Импорт компонента Container из локального файла

// Создаем компонент Footer (подвал сайта)
const Footer = () => {
  return (
    // Тег footer с классами стилей:
    // bg-dark - темный фон
    // text-white - белый текст
    // py-3 - вертикальные отступы
    // mt-5 - большой отступ сверху
    <footer className="bg-dark text-white py-3 mt-5">
      {/* Использую свой Container вместо стандартного */}
      <Container>
        {/* Параграф с центрированным текстом */}
        <p className="text-center">
          {/* Выводим текущий год и текст */}
            {new Date().getFullYear()} Лабораторные работы
        </p>
      </Container>
    </footer>
  );
};

// Экспортируем компонент для использования в других частях приложения
export default Footer;