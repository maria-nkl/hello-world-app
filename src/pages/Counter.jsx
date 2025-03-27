import React from 'react'; // Импортируем необходимые библиотеки
import { useSelector, useDispatch } from 'react-redux'; // Redux хуки для работы с состоянием
import { increment, decrement, reset } from '../store/actions'; // Импортируем действия (actions) для счетчика
import { Button, Card } from 'react-bootstrap'; // Компоненты UI из Bootstrap
import { useTheme } from '../context/ThemeContext'; // Хук для работы с темой приложения

// Компонент Counter - реализует счетчик с Redux
const Counter = () => {
  // 1. Получаем текущее значение счетчика из Redux хранилища
  // state.counter.count - обращаемся к свойству count в разделе counter
  const count = useSelector(state => state.counter.count);
  
  // 2. Получаем функцию dispatch для отправки действий
  const dispatch = useDispatch();
  
  // 3. Получаем текущую тему приложения
  const { isDark } = useTheme();

  // Возвращаем разметку компонента
  return (
    // Карточка Bootstrap с:
    // - отступом сверху (mt-4)
    // - темным фоном и белым текстом в темной теме
    <Card className={`mt-4 ${isDark ? 'bg-dark text-white' : ''}`}>
      <Card.Body className="text-center">
        {/* Заголовок карточки */}
        <Card.Title>Счетчик</Card.Title>
        
        {/* Текущее значение счетчика (большой шрифт) */}
        <Card.Text className="display-4 mb-4">{count}</Card.Text>
        
        {/* Контейнер для кнопок с гибкой разметкой */}
        <div className="d-flex justify-content-center gap-3">
          {/* Кнопка "+" */}
          <Button 
            variant="success" // Зеленый цвет
            onClick={() => dispatch(increment())} // Увеличиваем счетчик
            className="px-4" // Горизонтальные отступы
          >
            +
          </Button>
          
          {/* Кнопка "-" */}
          <Button 
            variant="danger" // Красный цвет
            onClick={() => dispatch(decrement())} // Уменьшаем счетчик
            className="px-4" // Горизонтальные отступы
          >
            -
          </Button>
          
          {/* Кнопка "Сброс" */}
          <Button 
            variant="secondary" // Серый цвет
            onClick={() => dispatch(reset())} // Сбрасываем счетчик
          >
            Сброс
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

// Экспортируем компонент для использования в других частях приложения
export default Counter;