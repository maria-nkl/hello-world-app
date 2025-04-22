import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Offcanvas, Spinner } from 'react-bootstrap';
import { useTheme } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';

// Компоненты (не ленивые)
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';

// Ленивые страницы
const Home = lazy(() => import('./pages/Home'));
const Labs = lazy(() => import('./pages/Labs'));
const Counter = lazy(() => import('./pages/Counter'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const FeedbackPage = lazy(() => import('./pages/FeedbackPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

import { labsData } from './data/labs';

const App = () => {
  const { isDark } = useTheme();
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);
  const closeMenu = () => setShowMenu(false);

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
          {isAuthenticated && (
            <Offcanvas show={showMenu} onHide={closeMenu} placement="start" className={isDark ? 'bg-dark text-white' : ''}>
              <Offcanvas.Header closeButton closeVariant={isDark ? 'white' : undefined}>
                <Offcanvas.Title>Навигация</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Menu labs={labsData} onItemClick={closeMenu} />
              </Offcanvas.Body>
            </Offcanvas>
          )}

          <Col md={12}>
            <Suspense fallback={
              <div className="text-center py-5">
                <Spinner animation="border" />
                <p>Загрузка страницы...</p>
              </div>
            }>
              <Routes>
                <Route path="/auth" element={<AuthPage />} />

                <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/auth" state={{ from: location }} replace />} />
                <Route path="/labs/:labId" element={isAuthenticated ? <Labs labs={[]} /> : <Navigate to="/auth" state={{ from: location }} replace />} />
                <Route path="/counter" element={isAuthenticated ? <Counter /> : <Navigate to="/auth" state={{ from: location }} replace />} />
                <Route path="/feedback" element={isAuthenticated ? <FeedbackPage /> : <Navigate to="/auth" state={{ from: location }} replace />} />
                <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/auth" replace />} />
                <Route path="/about" element={isAuthenticated ? <AboutPage /> : <Navigate to="/auth" state={{ from: location }} replace />} />

                <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <AdminPage /> : <Navigate to="/" replace />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default App;
