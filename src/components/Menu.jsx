import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext'; // Добавляем импорт useAuth

const Menu = ({ labs, onItemClick }) => {
  const { isDark } = useTheme();
  const { user } = useAuth(); // Получаем данные пользователя
  const location = useLocation();

  const labsArray = Array.isArray(labs) ? labs : Object.values(labs || {});

  return (
    <div className="mb-4">
      <h3 className="h4 mb-3">Лабораторные работы</h3>
      
      <ListGroup>
        {labsArray.map(lab => (
          <ListGroup.Item
            key={lab.id}
            as={Link}
            to={`/labs/${lab.id}`}
            active={location.pathname === `/labs/${lab.id}`}
            className={`text-start ${isDark ? 'bg-dark text-white' : ''}`}
            onClick={onItemClick}
          >
            {lab.title}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <h4 className="h5 mb-3 mt-4">Дополнительно</h4>
      
      <ListGroup>
        <ListGroup.Item
          as={Link}
          to="/counter"
          active={location.pathname === '/counter'}
          className={`text-start ${isDark ? 'bg-dark text-white' : ''}`}
          onClick={onItemClick}
        >
          Счетчик
        </ListGroup.Item>
        
        {/* Убираем "Обратная связь" из основного меню */}
        {user?.role !== 'admin' && (
          <ListGroup.Item
            as={Link}
            to="/feedback"
            active={location.pathname === '/feedback'}
            className={`text-start ${isDark ? 'bg-dark text-white' : ''}`}
            onClick={onItemClick}
          >
            Обратная связь
          </ListGroup.Item>
        )}
      </ListGroup>

      {/* Добавляем раздел администрирования */}
      {user?.role === 'admin' && (
        <div className="mt-4">
          <h5 className="h6 mb-3">Администрирование</h5>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a 
                href="/admin" 
                className="nav-link text-danger"
                onClick={onItemClick}
              >
                Панель администратора
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="/feedback" 
                className="nav-link text-danger"
                onClick={onItemClick}
              >
                Управление отзывами
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;