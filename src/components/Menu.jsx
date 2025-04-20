import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Menu = ({ labs, onItemClick }) => {
  const { isDark } = useTheme();
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
        
        <ListGroup.Item
          as={Link}
          to="/feedback"
          active={location.pathname === '/feedback'}
          className={`text-start ${isDark ? 'bg-dark text-white' : ''}`}
          onClick={onItemClick}
        >
          Обратная связь
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Menu;
