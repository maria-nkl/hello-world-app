// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers';
// import authReducer from './slices/authSlice';
// import feedbackReducer from './slices/feedbackSlice';
// import counterReducer from './slices/counterSlice';

// export default configureStore({
//   reducer: {
//     main: rootReducer,
//     counter: counterReducer,
//     auth: authReducer,
//     feedback: feedbackReducer
//   }
// });

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import authReducer from './slices/authSlice';
import counterReducer from './slices/counterSlice';
import { api } from './slices/apiSlice';

export default configureStore({
  reducer: {
    main: rootReducer,
    counter: counterReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});