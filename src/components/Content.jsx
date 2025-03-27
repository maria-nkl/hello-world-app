import React from 'react'; // Основная библиотека React
import { Card } from 'react-bootstrap'; // Готовый компонент карточки из Bootstrap
import { useParams } from 'react-router-dom'; // Хук для работы с параметрами URL
import { useTheme } from '../context/ThemeContext'; // Наш хук для работы с темой

// Компонент Content - отображает содержимое лабораторной работы
const Content = ({ labs }) => {
  // 1. Получаем параметр labId из URL (например, для /labs/123 вернет "123")
  const { labId } = useParams();
  
  // 2. Получаем текущую тему (isDark - true/false)
  const { isDark } = useTheme();
  
  // 3. Находим нужную лабораторную работу:
  // - Ищем по совпадению id
  // - Если не нашли - берем первую работу из списка
  const lab = labs.find(l => l.id === Number(labId)) || labs[0];

  // Возвращаем JSX разметку
  return (
    // Карточка Bootstrap с динамическими классами:
    // - mt-3 - отступ сверху
    // - bg-secondary text-white - если темная тема
    <Card className={`mt-3 ${isDark ? 'bg-secondary text-white' : ''}`}>
      <Card.Body>
        {/* Заголовок карточки - название работы */}
        <Card.Title>{lab.title}</Card.Title>
        
        {/* Основное содержимое карточки */}
        <Card.Text>
          {/* Текст лабораторной работы */}
          {lab.content}
          
          {/* Если есть кнопки - отображаем их */}
          {lab.buttons && (
            <div className="mt-3 text-center">
              {/* Контейнер для кнопок с flex-разметкой: */}
              {/* - d-flex - гибкий контейнер */}
              {/* - flex-wrap - перенос на новую строку */}
              {/* - justify-content-center - центрирование по горизонтали */}
              {/* - gap-2 - промежутки между элементами */}
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {/* Для каждой кнопки в массиве lab.buttons */}
                {lab.buttons.map((btn, index) => (
                  // Создаем кнопку с:
                  // - key - уникальный ключ (обязательно для списков в React)
                  // - text-white - белый текст
                  // - style - цвет фона из данных кнопки
                  // - onClick - обработчик клика
                  <button
                    key={index}
                    className="btn text-white"
                    style={{ backgroundColor: btn.color }}
                    onClick={() => alert(`Выбрано: ${btn.title}`)}
                  >
                    {/* Текст кнопки */}
                    {btn.title}
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

// Экспортируем компонент для использования в других файлах
export default Content;