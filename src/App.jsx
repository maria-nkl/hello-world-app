import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Offcanvas } from 'react-bootstrap';
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
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage'; // Новая страница админки

// Данные
import { labsData } from './data/labs';

const App = () => {
  const { isDark } = useTheme();
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);
  const closeMenu = () => setShowMenu(false);

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
      <Header onToggleMenu={toggleMenu} />
      
      <Container className="flex-grow-1 my-4">
        <Row>
          {/* Скрытое меню лабораторных работ */}
          {isAuthenticated && (
            <Offcanvas 
              show={showMenu} 
              onHide={closeMenu}
              placement="start"
              className={isDark ? 'bg-dark text-white' : ''}
            >
              <Offcanvas.Header closeButton closeVariant={isDark ? 'white' : undefined}>
                <Offcanvas.Title>Навигация</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {/* <Menu labs={labsData} onItemClick={closeMenu} />
                {user?.role === 'admin' && (
                  <div className="mt-4">
                    <h5 className="h6 mb-3">Администрирование</h5>
                    <ul className="nav flex-column">
                      <li className="nav-item">
                        <a 
                          href="/admin" 
                          className="nav-link text-danger"
                          onClick={closeMenu}
                        >
                          Панель администратора
                        </a>
                      </li>
                    </ul>
                  </div>
                )} */}
                <Menu labs={labsData} onItemClick={closeMenu} />
              </Offcanvas.Body>
            </Offcanvas>
          )}
          
          {/* Основное содержимое */}
          <Col md={isAuthenticated ? { span: 12 } : 12}>
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
              <Route
                path="/profile"
                element={isAuthenticated ? <ProfilePage /> : <Navigate to="/auth" replace />}
              />
              <Route
                path="/about"
                element={isAuthenticated ? <AboutPage /> : <Navigate to="/auth" state={{ from: location }} replace />}
              />
              
              {/* Админские маршруты */}
              <Route
                path="/admin"
                element={
                  isAuthenticated && user?.role === 'admin' ? (
                    <AdminPage />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
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