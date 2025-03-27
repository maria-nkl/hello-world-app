// Начальное состояние хранилища Redux
const initialState = {
  counter: {  // Раздел для данных счетчика
    count: 0   // Начальное значение счетчика
  },
  activeLab: null // ID активной лабораторной работы (пока нет)
};

// Главный редьюсер (reducer) - обрабатывает все действия (actions)
export default function rootReducer(state = initialState, action) {
  // action.type - тип действия (например 'INCREMENT')
  // action.payload - дополнительные данные (например ID лабораторной работы)
  
  switch (action.type) {
    // Обработка увеличения счетчика
    case 'INCREMENT':
      return {
        ...state, // Копируем текущее состояние
        counter: {
          count: state.counter.count + 1 // Увеличиваем счетчик на 1
        }
      };
    
    // Обработка уменьшения счетчика
    case 'DECREMENT':
      return {
        ...state, // Копируем текущее состояние
        counter: {
          count: state.counter.count - 1 // Уменьшаем счетчик на 1
        }
      };
    
    // Обработка сброса счетчика
    case 'RESET':
      return {
        ...state, // Копируем текущее состояние
        counter: {
          count: 0 // Обнуляем счетчик
        }
      };
    
    // Обработка изменения активной лабораторной работы
    case 'SET_ACTIVE_LAB':
      return {
        ...state, // Копируем текущее состояние
        activeLab: action.payload // Устанавливаем новый ID активной работы
      };
    
    // Если действие неизвестно - возвращаем текущее состояние без изменений
    default:
      return state;
  }
}