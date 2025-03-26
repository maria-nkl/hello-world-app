import React from "react";
import { Container as BootstrapContainer } from "react-bootstrap";

// создаем свой контейнер который принимает children — что кладём внутрь (текст, кнопки, картинки) и className — дополнительные стили (по умолчанию пусто)
const Container = ({ 
  children, 
  className = "" 
}) => {
  return (
    // Используем готовую "коробку" из Bootstrap. добавляем стандартные отступы (my-4) подставляем переданные стили (сlassname)
    <BootstrapContainer 
    className={`my-4 ${className}`}
    >
      {children}       {/* показываем всё, что передали ранее */}
    </BootstrapContainer>
  );
};

// делаем доступной для использования в других файлах
export default Container;