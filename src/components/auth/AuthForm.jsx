// Импортируем необходимые компоненты и хуки из библиотек
import React, { useState } from 'react'; // useState - хук для управления состоянием
import { Tabs, Tab, Card } from 'react-bootstrap'; // Компоненты Bootstrap для вкладок и карточки
import LoginForm from './LoginForm'; // Компонент формы входа
import RegisterForm from './RegisterForm'; // Компонент формы регистрации

// Основной компонент AuthForm, объединяющий формы входа и регистрации
const AuthForm = () => {
  // Состояние для отслеживания активной вкладки
  // По умолчанию активна вкладка 'login'
  const [activeTab, setActiveTab] = useState('login');

  return (
    // Карточка Bootstrap с ограничением максимальной ширины и отступами
    <Card className="mt-4 mx-auto" style={{ maxWidth: '500px' }}>
      <Card.Body>
        {/* Компонент вкладок (табов) из Bootstrap */}
        <Tabs
          activeKey={activeTab} // Указываем текущую активную вкладку
          onSelect={(k) => setActiveTab(k)} // Обработчик смены вкладки
          className="mb-3" // Добавляем отступ снизу
        >
          {/* Первая вкладка - "Вход" */}
          <Tab eventKey="login" title="Вход">
            {/* Компонент формы входа */}
            {/* При успешном входе вызываем onSuccess, который переключает на вкладку login */}
            {/* (это может быть полезно после успешной регистрации) */}
            <LoginForm onSuccess={() => setActiveTab('login')} />
          </Tab>
          
          {/* Вторая вкладка - "Регистрация" */}
          <Tab eventKey="register" title="Регистрация">
            {/* Компонент формы регистрации */}
            {/* При успешной регистрации переключаем на вкладку login */}
            <RegisterForm onSuccess={() => setActiveTab('login')} />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default AuthForm;