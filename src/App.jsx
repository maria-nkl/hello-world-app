// import React from 'react';
// import { Routes, Route } from 'react-router-dom'; // Компоненты для маршрутизации (переход между страницами)
// import { Container, Row, Col } from 'react-bootstrap'; // Компоненты сетки Bootstrap для адаптивного дизайна

// import Header from './components/Header'; // Шапка сайта
// import Footer from './components/Footer'; // Подвал сайта
// import Menu from './components/Menu';    // Боковое меню

// import Home from './pages/Home';       // Главная страница
// import Labs from './pages/Labs';       // Страница лабораторных работ
// import Counter from './pages/Counter'; // Страница счетчика

// import { labsData } from './data/labs'; // Список всех лабораторных работ


// const App = () => {
//   return (
//     // Основной контейнер приложения:
//     // - d-flex flex-column: вертикальное расположение
//     // - min-vh-100: занимает минимум 100% высоты экрана
//     <div className="d-flex flex-column min-vh-100">
//       {/* Шапка сайта (всегда отображается) */}
//       <Header />
      
//       {/* Основное содержимое страницы */}
//       <Container className="flex-grow-1 my-4">
//         {/* Строка с сеткой Bootstrap */}
//         <Row>
//           {/* Левая колонка (3 из 12 частей ширины на больших экранах) */}
//           {/* mb-4 mb-md-0: отступ снизу на мобильных, без отступа на десктопах */}
//           <Col md={3} className="mb-4 mb-md-0">
//             {/* Компонент меню с передачей списка лабораторных работ */}
//             <Menu labs={labsData} />
//           </Col>
          
//           {/* Правая колонка (9 из 12 частей ширины) - основное содержимое */}
//           <Col md={9}>
//             {/* Система маршрутизации (определяет что показывать) */}
//             <Routes>
//               {/* Главная страница (http://.../) */}
//               <Route path="/" element={<Home />} />
              
//               {/* Страница лабораторной работы (http://.../labs/1) */}
//               <Route path="/labs/:labId" element={<Labs labs={labsData} />} />
              
//               {/* Страница счетчика (http://.../counter) */}
//               <Route path="/counter" element={<Counter />} />
//             </Routes>
//           </Col>
//         </Row>
//       </Container>
      
//       {/* Подвал сайта (всегда отображается) */}
//       <Footer />
//     </div>
//   );
// };

// // Экспортируем компонент для использования
// export default App;
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useTheme } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';

// Компоненты
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import ThemeToggle from './components/ThemeToggle';

// Страницы
import Home from './pages/Home';
import Labs from './pages/Labs';
import Counter from './pages/Counter';
import AuthPage from './pages/AuthPage';
import FeedbackPage from './pages/FeedbackPage';
import NotFoundPage from './pages/NotFoundPage';

// Данные
import { labsData } from './data/labs';

const App = () => {
  const { isDark } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Показываем лоадер при проверке аутентификации
  if (isLoading) {
    return (
      <div className={`d-flex justify-content-center align-items-center min-vh-100 ${isDark ? 'bg-dark' : 'bg-light'}`}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`d-flex flex-column min-vh-100 ${isDark ? 'bg-dark text-white' : ''}`}>
      <Header />
      
      <Container className="flex-grow-1 my-4">
        <Row>
          {/* Показываем меню только для авторизованных пользователей */}
          {isAuthenticated && (
            <Col md={3} className="mb-4 mb-md-0">
              <Menu labs={labsData} />
            </Col>
          )}
          
          {/* Основное содержимое */}
          <Col md={isAuthenticated ? 9 : 12}>
            <Routes>
              {/* Публичные маршруты */}
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Защищенные маршруты */}
              <Route
                path="/"
                element={isAuthenticated ? <Home /> : <Navigate to="/auth" state={{ from: location }} replace />}
              />
              <Route
                path="/labs/:labId"
                element={isAuthenticated ? <Labs labs={labsData} /> : <Navigate to="/auth" state={{ from: location }} replace />}
              />
              <Route
                path="/counter"
                element={isAuthenticated ? <Counter /> : <Navigate to="/auth" state={{ from: location }} replace />}
              />
              <Route
                path="/feedback"
                element={isAuthenticated ? <FeedbackPage /> : <Navigate to="/auth" state={{ from: location }} replace />}
              />
              
              {/* 404 - Not Found */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default App;