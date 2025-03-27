import React from 'react'; // Основная библиотека React
import ReactDOM from 'react-dom/client'; // Для рендеринга React в DOM

// Импортируем инструменты для маршрутизации, состояния и темы
import { BrowserRouter } from 'react-router-dom'; // Для навигации между страницами
import { Provider } from 'react-redux'; // Для подключения Redux хранилища
import { ThemeProvider } from './context/ThemeContext'; // Для управления темой

// Импортируем настройки хранилища и главный компонент
import store from './store/store'; // Наше Redux хранилище
import App from './App'; // Главный компонент приложения

// Импортируем стили
import 'bootstrap/dist/css/bootstrap.min.css'; // Стили Bootstrap
import './index.css'; // Наши кастомные стили

// Создаем корневой элемент и рендерим приложение
ReactDOM.createRoot(document.getElementById('root')).render(
  // Режим StrictMode помогает выявлять проблемы в приложении
  <React.StrictMode>
    
    {/* BrowserRouter обеспечивает работу маршрутизации */}
    <BrowserRouter>
      
      {/* Provider связывает Redux хранилище с приложением */}
      <Provider store={store}>
        
        {/* ThemeProvider дает доступ к теме всем компонентам */}
        <ThemeProvider>
          
          {/* Главный компонент нашего приложения */}
          <App />
          
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);