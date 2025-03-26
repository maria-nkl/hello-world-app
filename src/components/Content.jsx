import React from "react"; // Основная библиотека React
import { Card } from "react-bootstrap"; // Готовый компонент карточки из Bootstrap

// Компонент Content для отображения содержимого лабораторной работы (на вход id лабраторной работы и список всех лр)
const Content = ({ activeLab, labs }) => {
  // Находим нужную лабораторную работу:
  // 1. Ищем работу с id равным activeLab
  // 2. Если не нашли - берем первую работу из списка (labs[0])
  const lab = labs.find(l => l.id === activeLab) || labs[0];
  
  return (
    // Карточка с отступом сверху (mt-3)
    <Card className="mt-3">
      <Card.Body> {/* Тело карточки */}
        {/* Заголовок карточки - название лабораторной работы */}
        <Card.Title>{lab.title}</Card.Title>
        
        {/* Основное содержимое карточки */}
        <Card.Text>
          {/* Выводим основной текст работы */}
          {lab.content}
          
          {/* Если есть кнопки - отображаем их */}
          {lab.buttons && (
            // Контейнер для кнопок с:
            // отступом сверху (mt-3)
            // text-center для центрирования содержимого
            // гибким расположением (d-flex)
            // переносом на новую строку (flex-wrap)
            // justify-content-center для центрирования кнопок по горизонтали
            // промежутком между кнопками (gap-2)
            <div className="mt-3 text-center">
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {/* Для каждой кнопки в массиве lab.buttons */}
                {lab.buttons.map((btn, index) => (
                // Создаем кнопку с:
                // уникальным ключом (key)
                // базовым классом btn
                // белым текстом (text-white)
                // цветом фона из btn.color
                  <button
                    key={index} // Важно для React при работе со списками
                    className="btn text-white"
                    style={{ backgroundColor: btn.color }}
                    onClick={() => alert(`Выбрано: ${btn.title}`)} // уведомление
                  >
                    {btn.title} {/* Текст на кнопке */}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

// Делаем компонент доступным для использования в других файлах
export default Content;