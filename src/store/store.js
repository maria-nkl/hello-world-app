// // Импортируем функцию configureStore из Redux Toolkit
// // Это специальный инструмент для создания Redux-хранилища
// import { configureStore } from '@reduxjs/toolkit';

// // Импортируем наш главный редьюсер, который будет управлять состоянием
// import rootReducer from './reducers';

// // Создаем и настраиваем Redux-хранилище
// export default configureStore({
//   // Передаем наш корневой редьюсер
//   // Теперь Redux знает, как обновлять состояние при получении действий
//   reducer: rootReducer,
  
//   // Redux Toolkit автоматически добавляет:
//   // 1. Redux DevTools для отладки
//   // 2. Мидлвары для обработки асинхронных операций
//   // 3. Проверку на случайные мутации состояния
// });

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import authReducer from './slices/authSlice';
import feedbackReducer from './slices/feedbackSlice';
import counterReducer from './slices/counterSlice';

export default configureStore({
  reducer: {
    main: rootReducer,
    counter: counterReducer,
    auth: authReducer,
    feedback: feedbackReducer
  }
});