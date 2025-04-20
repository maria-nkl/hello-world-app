// // // Импортируем необходимые хуки из React
// // import React, { createContext, useState, useEffect, useContext } from 'react';

// // // 1. Создаем контекст для темы (это как "глобальная переменная" для компонентов)
// // const ThemeContext = createContext();

// // // 2. Создаем компонент-поставщик данных (ThemeProvider)
// // export const ThemeProvider = ({ children }) => {
// //   // 3. Используем useState для хранения состояния темы
// //   // Начальное значение берем из localStorage или false (светлая тема)
// //   const [isDark, setIsDark] = useState(() => {
// //     return JSON.parse(localStorage.getItem('theme')) || false;
// //   });

// //   // 4. Используем useEffect для side-эффектов
// //   useEffect(() => {
// //     // При изменении темы:
// //     // - Сохраняем в localStorage (чтобы запомнить выбор пользователя)
// //     localStorage.setItem('theme', JSON.stringify(isDark));
    
// //     // - Меняем классы у body для применения стилей
// //     document.body.className = isDark ? 'bg-dark text-white' : 'bg-light text-dark';
// //   }, [isDark]); // Зависимость - эффект срабатывает при изменении isDark

// //   // 5. Функция переключения темы
// //   const toggleTheme = () => setIsDark(!isDark);

// //   // 6. Возвращаем провайдер контекста с текущими значениями
// //   return (
// //     <ThemeContext.Provider value={{ isDark, toggleTheme }}>
// //       {children}
// //     </ThemeContext.Provider>
// //   );
// // };

// // // 7. Создаем кастомный хук для удобного использования контекста
// // export const useTheme = () => useContext(ThemeContext);

// // // 8. Экспортируем сам контекст для особых случаев использования
// // export { ThemeContext };

// import React, { createContext, useState, useContext } from 'react';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   // Инициализируем тему из localStorage или используем светлую по умолчанию
//   const [isDark, setIsDark] = useState(() => {
//     const savedTheme = localStorage.getItem('theme');
//     return savedTheme ? JSON.parse(savedTheme) : false;
//   });

//   // Новая функция для изменения темы, которая сразу обновляет все необходимые значения
//   const toggleTheme = () => {
//     const newTheme = !isDark;
//     setIsDark(newTheme);
    
//     // 1. Сохраняем в localStorage
//     localStorage.setItem('theme', JSON.stringify(newTheme));
    
//     // 2. Применяем классы к body напрямую
//     document.body.className = newTheme ? 'bg-dark text-white' : 'bg-light text-dark';
//   };

//   // Сразу применяем текущую тему при первой загрузке
//   document.body.className = isDark ? 'bg-dark text-white' : 'bg-light text-dark';

//   return (
//     <ThemeContext.Provider value={{ isDark, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
// export { ThemeContext };


import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Инициализируем тему из localStorage или используем светлую по умолчанию
  const [isDark, setIsDark] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      // Пытаемся распарсить значение как JSON, если оно существует
      return savedTheme ? JSON.parse(savedTheme) : false;
    } catch (error) {
      // Если парсинг не удался, возвращаем значение по умолчанию
      console.error('Ошибка при чтении темы из localStorage:', error);
      return false; // Светлая тема по умолчанию
    }
  });

  // Новая функция для изменения темы, которая сразу обновляет все необходимые значения
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    // 1. Сохраняем в localStorage
    localStorage.setItem('theme', JSON.stringify(newTheme));

    // 2. Применяем классы к body напрямую
    document.body.className = newTheme ? 'bg-dark text-white' : 'bg-light text-dark';
  };

  // Сразу применяем текущую тему при первой загрузке
  document.body.className = isDark ? 'bg-dark text-white' : 'bg-light text-dark';

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export { ThemeContext };