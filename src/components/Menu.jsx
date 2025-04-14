// // Импортируем необходимые библиотеки и компоненты
// import React from 'react';
// import { ListGroup } from 'react-bootstrap'; // Готовый компонент списка из Bootstrap
// import { Link, useLocation } from 'react-router-dom'; // Компоненты для навигации
// import { useTheme } from '../context/ThemeContext'; // Хук для работы с темой

// // Компонент Menu - отображает меню лабораторных работ и ссылки
// const Menu = ({ labs }) => {
//   // Получаем текущую тему (true - темная, false - светлая)
//   const { isDark } = useTheme();
  
//   // Получаем текущий путь (URL) для определения активного пункта меню
//   const location = useLocation();

//   return (
//     <div className="mb-4">
//       {/* Заголовок раздела лабораторных работ */}
//       <h3 className="h4 mb-3">Лабораторные работы</h3>
      
//       {/* Список лабораторных работ */}
//       <ListGroup>
//         {/* Перебираем массив лабораторных работ */}
//         {labs.map(lab => (
//           // Каждый пункт меню:
//           <ListGroup.Item
//             key={lab.id} // Уникальный ключ для React
//             as={Link} // Превращаем в ссылку
//             to={`/labs/${lab.id}`} // Куда ведет ссылка
//             // Подсвечиваем если текущий путь совпадает с ссылкой
//             active={location.pathname === `/labs/${lab.id}`}
//             // Динамические классы:
//             // - text-start: выравнивание текста по левому краю
//             // - bg-dark text-white: если темная тема
//             className={`text-start ${isDark ? 'bg-dark text-white' : ''}`}
//           >
//             {/* Название лабораторной работы */}
//             {lab.title}
//           </ListGroup.Item>
//         ))}
//       </ListGroup>

//       {/* Пустой заголовок для отступа */}
//       <h4 className="h5 mb-3"></h4>
      
//       {/* Список дополнительных ссылок */}
//       <ListGroup>
//         {/* Пункт меню "Счетчик" */}
//         <ListGroup.Item
//           as={Link}
//           to="/counter"
//           active={location.pathname === '/counter'}
//           className={`text-start ${isDark ? 'bg-dark text-white' : ''}`}
//         >
//           Счетчик
//         </ListGroup.Item>
//         <ListGroup.Item
//           as={Link}
//           to="/feedback"
//           active={location.pathname === '/feedback'}
//           className={`text-start ${isDark ? 'bg-dark text-white' : ''}`}
//         >
//         Обратная связь
//         </ListGroup.Item>
//       </ListGroup>
//     </div>
//   );
// };

// export default Menu;

import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Menu = ({ labs }) => {
  const { isDark } = useTheme();
  const location = useLocation();

  // Преобразуем labs в массив, если это объект
  const labsArray = Array.isArray(labs) 
    ? labs 
    : Object.values(labs || {});

  return (
    <div className="mb-4">
      {/* Заголовок раздела лабораторных работ */}
      <h3 className="h4 mb-3">Лабораторные работы</h3>
      
      {/* Список лабораторных работ */}
      <ListGroup>
        {labsArray.map(lab => (
          <ListGroup.Item
            key={lab.id}
            as={Link}
            to={`/labs/${lab.id}`}
            active={location.pathname === `/labs/${lab.id}`}
            className={`text-start ${isDark ? 'bg-dark text-white' : ''}`}
          >
            {lab.title}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Раздел дополнительных страниц */}
      <h4 className="h5 mb-3 mt-4">Дополнительно</h4>
      
      <ListGroup>
        <ListGroup.Item
          as={Link}
          to="/counter"
          active={location.pathname === '/counter'}
          className={`text-start ${isDark ? 'bg-dark text-white' : ''}`}
        >
          Счетчик
        </ListGroup.Item>
        
        <ListGroup.Item
          as={Link}
          to="/feedback"
          active={location.pathname === '/feedback'}
          className={`text-start ${isDark ? 'bg-dark text-white' : ''}`}
        >
          Обратная связь
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Menu;