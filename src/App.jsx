import React, { useState } from 'react'; // React и хук состояния
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Content from './components/Content';
import Container from './components/Container';
import Row from 'react-bootstrap/Row'; // Компонент строки из Bootstrap
import Col from 'react-bootstrap/Col'; // Компонент колонки из Bootstrap
import './App.css';


// Массив данных о лабораторных работах
const labs = [
  {
    id: 1,
    title: "Лабораторная работа 1",
    content: "Содержимое первой лабораторной работы"
  },
  {
    id: 2,
    title: "Лабораторная работа 2",
    content: "Содержимое второй лабораторной работы"
  },
  {
    id: 3,
    title: "Лабораторная работа 3",
    content: "Содержимое третей лабораторной работы"
  },
  {
    id: 4,
    title: "Работа 4",
    content: "Описание четвертой работы...",
    buttons: [
      { title: "Скачать", color: "#3b82f6" },
      { title: "Запустить", color: "#10b981" }
    ]
  }
];

// Главный компонент приложения
const App = () => {
  // Состояние для хранения ID активной лабораторной работы
  // По умолчанию выбираем первую работу (labs[0].id)
  const [activeLab, setActiveLab] = useState(labs[0].id);
  
  // Массив кнопок из лабораторной работы 2
  const buttons = [
    { title: 'Кнопка 1', color: 'red' },
    { title: 'Кнопка 2', color: 'blue' },
    { title: 'Кнопка 3', color: 'green' },
    { title: 'Кнопка 4', color: 'orange' }
  ];

  return (
    // Основной контейнер приложения
    // d-flex flex-column - делает layout вертикальным
    // min-vh-100 - занимает минимум 100% высоты экрана
    <div className="d-flex flex-column min-vh-100">
      {/* Шапка сайта */}
      <Header />
      
      {/* Основное содержимое в контейнере */}
      <Container className="flex-grow-1 my-4">
        {/* Строка с сеткой Bootstrap */}
        <Row>
          {/* Левая колонка (3 из 12 частей ширины на средних экранах и больше) */}
          <Col md={3}>
            {/* Компонент меню с передачей параметров:
                - labs - список работ
                - activeLab - текущая выбранная работа
                - setActiveLab - функция для изменения выбранной работы */}
            <Menu labs={labs} activeLab={activeLab} setActiveLab={setActiveLab} />
          </Col>
          
          {/* Правая колонка (9 из 12 частей ширины) */}
          <Col md={9}>
            {/* Компонент содержимого с передачей параметров */}
            <Content activeLab={activeLab} labs={labs} />
            
            {/* Блок с кнопками */}
            <div className="d-flex flex-column align-items-center mt-5">
              {/* Контейнер для кнопок с фоном, отступами и скругленными углами */}
              <div className="bg-light p-4 rounded" style={{ maxWidth: '600px', width: '100%' }}>
                {/* Заголовок блока */}
                <h3 className="text-center mb-4">Цветные кнопки</h3>
                
                {/* Контейнер для кнопок с flex-разметкой */}
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  {/* Перебираем массив кнопок и создаем для каждой элемент */}
                  {buttons.map((btn, index) => (
                    <button
                      key={index} // Уникальный ключ для React
                      className="btn text-white py-2 px-4" // Классы Bootstrap
                      style={{ 
                        backgroundColor: btn.color, // Цвет фона из массива
                        minWidth: '120px' // Минимальная ширина
                      }}
                      onClick={() => alert(`Вы нажали ${btn.title}`)}
                    >
                      {/* Текст кнопки */}
                      {btn.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      
      {/* Подвал сайта */}
      <Footer />
    </div>
  );
};

export default App;