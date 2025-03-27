import React from 'react';
import { useSelector } from 'react-redux'; // Хук useSelector для доступа к Redux хранилищу
import Content from '../components/Content'; // Компонент Content для отображения содержимого лабораторной работы
import { labsData } from '../data/labs'; // Импортируем данные лабораторных работ

// Компонент Labs - страница для отображения лабораторных работ
const Labs = () => {
  // Получаем ID активной лабораторной работы из Redux хранилища
  // state.activeLab - обращаемся к полю activeLab в Redux состоянии
  const activeLab = useSelector(state => state.activeLab);
  
  // Возвращаем разметку страницы
  return (
    <div>
      {/* Передаем в компонент Content: */}
      {/* - labsData: список всех лабораторных работ */}
      {/* - activeLab: ID текущей активной работы */}
      <Content labs={labsData} activeLab={activeLab} />
    </div>
  );
};

// Экспортируем компонент для использования в роутинге
export default Labs;