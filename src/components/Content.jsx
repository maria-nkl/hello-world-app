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