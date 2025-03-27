import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Компоненты для маршрутизации (переход между страницами)
import { Container, Row, Col } from 'react-bootstrap'; // Компоненты сетки Bootstrap для адаптивного дизайна

import Header from './components/Header'; // Шапка сайта
import Footer from './components/Footer'; // Подвал сайта
import Menu from './components/Menu';    // Боковое меню

import Home from './pages/Home';       // Главная страница
import Labs from './pages/Labs';       // Страница лабораторных работ
import Counter from './pages/Counter'; // Страница счетчика

import { labsData } from './data/labs'; // Список всех лабораторных работ


const App = () => {
  return (
    // Основной контейнер приложения:
    // - d-flex flex-column: вертикальное расположение
    // - min-vh-100: занимает минимум 100% высоты экрана
    <div className="d-flex flex-column min-vh-100">
      {/* Шапка сайта (всегда отображается) */}
      <Header />
      
      {/* Основное содержимое страницы */}
      <Container className="flex-grow-1 my-4">
        {/* Строка с сеткой Bootstrap */}
        <Row>
          {/* Левая колонка (3 из 12 частей ширины на больших экранах) */}
          {/* mb-4 mb-md-0: отступ снизу на мобильных, без отступа на десктопах */}
          <Col md={3} className="mb-4 mb-md-0">
            {/* Компонент меню с передачей списка лабораторных работ */}
            <Menu labs={labsData} />
          </Col>
          
          {/* Правая колонка (9 из 12 частей ширины) - основное содержимое */}
          <Col md={9}>
            {/* Система маршрутизации (определяет что показывать) */}
            <Routes>
              {/* Главная страница (http://.../) */}
              <Route path="/" element={<Home />} />
              
              {/* Страница лабораторной работы (http://.../labs/1) */}
              <Route path="/labs/:labId" element={<Labs labs={labsData} />} />
              
              {/* Страница счетчика (http://.../counter) */}
              <Route path="/counter" element={<Counter />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      
      {/* Подвал сайта (всегда отображается) */}
      <Footer />
    </div>
  );
};

// Экспортируем компонент для использования
export default App;