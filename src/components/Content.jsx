// // Импортируем необходимые зависимости
// import React from 'react';
// import { Card } from 'react-bootstrap'; // Компонент карточки из Bootstrap
// import { useParams } from 'react-router-dom'; // Хук для получения параметров URL
// import { useTheme } from '../context/ThemeContext'; // Хук для доступа к теме приложения

// // Компонент Content для отображения содержимого лабораторной работы
// const Content = ({ labs }) => {
//   // Получаем параметр labId из URL (например, для URL /labs/1 получим labId = "1")
//   const { labId } = useParams();
  
//   // Получаем текущую тему (темная/светлая) из контекста
//   const { isDark } = useTheme();
  
//   // Находим лабораторную работу по ID из URL или берем первую как fallback
//   const lab = labs.find(l => l.id === Number(labId)) || labs[0];

//   return (
//     // Карточка с динамическими классами в зависимости от темы
//     <Card className={`mt-3 ${isDark ? 'bg-secondary text-white' : ''}`}>
//       <Card.Body>
//         {/* Заголовок карточки - название лабораторной работы */}
//         <Card.Title>{lab.title}</Card.Title>
        
//         {/* Основное содержимое работы */}
//         <div className="card-text">
//           {/* Основной текст/контент лабораторной работы */}
//           {lab.content}
          
//           {/* Блок с кнопками (если они есть в данных) */}
//           {lab.buttons && (
//             <div className="mt-3 text-center">
//               {/* Контейнер для кнопок с flex-разметкой */}
//               <div className="d-flex flex-wrap justify-content-center gap-2">
//                 {/* Маппинг массива кнопок */}
//                 {lab.buttons.map((btn, index) => (
//                   <button
//                     key={index} // Уникальный ключ для React
//                     className="btn text-white" // Базовые классы кнопки
//                     style={{ backgroundColor: btn.color }} // Цвет из данных
//                     onClick={() => alert(`Выбрано: ${btn.title}`)} // Обработчик клика
//                   >
//                     {btn.title} {/* Текст кнопки */}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

// export default Content;

// import React from 'react';
// import { Card } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
// import { useTheme } from '../context/ThemeContext';

// // Компонент для отображения содержимого лабораторной работы
// const Content = ({ labs }) => {
//   // Получаем параметр labId из URL (например: /labs/1 → labId = "1")
//   const { labId } = useParams();
  
//   // Получаем текущую тему (темная/светлая) из контекста
//   const { isDark } = useTheme();
  
//   // Получаем лабораторную работу по ID или первую как fallback
//   // labs теперь ожидается как объект вида { '1': {id: 1, ...}, '2': {id: 2, ...} }
//   const lab = labs[labId-1] || labs[Object.keys(labs)[0]];

//   return (
//     // Карточка с динамическими классами в зависимости от темы
//     <Card className={`mt-3 ${isDark ? 'bg-secondary text-white' : ''}`}>
//       <Card.Body>
//         {/* Заголовок с названием лабораторной работы */}
//         <Card.Title>{lab.title}</Card.Title>
        
//         {/* Основное содержимое работы */}
//         <div className="card-text">
//           {/* HTML-содержимое лабораторной работы */}
//           {lab.content}
          
//           {/* Блок с кнопками (если они есть в данных) */}
//           {lab.buttons && (
//             <div className="mt-3 text-center">
//               {/* Flex-контейнер для кнопок с переносом и отступами */}
//               <div className="d-flex flex-wrap justify-content-center gap-2">
//                 {lab.buttons.map((btn, index) => (
//                   <button
//                     key={index}
//                     className="btn text-white"
//                     style={{ backgroundColor: btn.color }}
//                     onClick={() => alert(`Выбрано: ${btn.title}`)}
//                   >
//                     {btn.title}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

// export default Content;
import React from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Content = ({ labs }) => {
  const { labId } = useParams();
  const { isDark } = useTheme();
  
  // Получаем лабораторную работу по ID (теперь без вычитания 1)
  // Если работа не найдена - берем первую из доступных
  const lab = labs[labId] || labs[Object.keys(labs)[0]];

  // Защита от undefined (на случай пустого объекта labs)
  if (!lab) {
    return (
      <Card className={`mt-3 ${isDark ? 'bg-secondary text-white' : ''}`}>
        <Card.Body>
          <Card.Title>Лабораторная работа не найдена</Card.Title>
          <div className="card-text">
            Пожалуйста, выберите другую лабораторную работу из меню.
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className={`mt-3 ${isDark ? 'bg-secondary text-white' : ''}`}>
      <Card.Body>
        <Card.Title>{lab.title}</Card.Title>
        
        <div className="card-text">
          {lab.content}
          
          {lab.buttons && (
            <div className="mt-3 text-center">
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {lab.buttons.map((btn, index) => (
                  <button
                    key={index}
                    className="btn text-white"
                    style={{ backgroundColor: btn.color }}
                    onClick={() => alert(`Выбрано: ${btn.title}`)}
                  >
                    {btn.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Content;