// Файл actions.js - содержит все "действия" (actions) приложения

/* ДЕЙСТВИЯ ДЛЯ СЧЕТЧИКА */

// Увеличить счетчик на 1
// При вызове dispatch(increment()) Redux отправит это действие в редьюсер
export const increment = () => ({ 
  type: 'INCREMENT' // Тип действия - строка 'INCREMENT'
});

// Уменьшить счетчик на 1
export const decrement = () => ({ 
  type: 'DECREMENT' // Тип действия - строка 'DECREMENT'
});

// Сбросить счетчик в 0
export const reset = () => ({ 
  type: 'RESET' // Тип действия - строка 'RESET'
});

/* ДЕЙСТВИЯ ДЛЯ ЛАБОРАТОРНЫХ РАБОТ */

// Установить активную лабораторную работу
// Принимает labId - ID работы, которую нужно сделать активной
export const setActiveLab = (labId) => ({
  type: 'SET_ACTIVE_LAB', // Тип действия
  payload: labId // Дополнительные данные (в этом случае ID работы)
});