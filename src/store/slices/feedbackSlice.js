// // import { createSlice } from '@reduxjs/toolkit';

// // const feedbackSlice = createSlice({
// //   name: 'feedback',
// //   initialState: [],
// //   reducers: {
// //     addFeedback: (state, action) => {
// //       state.push(action.payload);
// //     }
// //   }
// // });

// // export const { addFeedback } = feedbackSlice.actions;
// // export default feedbackSlice.reducer;

// // src/store/slices/feedbackSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getFeedback, addFeedback, deleteFeedback } from '../../api/feedback';

// export const fetchFeedback = createAsyncThunk(
//   'feedback/fetchFeedback',
//   async (_, { rejectWithValue }) => {
//     try {
//       return await getFeedback();
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const createFeedback = createAsyncThunk(
//   'feedback/createFeedback',
//   async (feedbackData, { rejectWithValue }) => {
//     try {
//       return await addFeedback(feedbackData);
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const removeFeedback = createAsyncThunk(
//   'feedback/removeFeedback',
//   async (feedbackId, { rejectWithValue }) => {
//     try {
//       await deleteFeedback(feedbackId);
//       return feedbackId;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const feedbackSlice = createSlice({
//   name: 'feedback',
//   initialState: {
//     items: [],
//     status: 'idle',
//     error: null,
//     deletingId: null
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Загрузка отзывов
//       .addCase(fetchFeedback.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchFeedback.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items = action.payload;
//       })
//       .addCase(fetchFeedback.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
      
//       // Добавление отзыва
//       .addCase(createFeedback.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(createFeedback.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items.unshift(action.payload);
//       })
//       .addCase(createFeedback.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
      
//       // Удаление отзыва
//       .addCase(removeFeedback.pending, (state, action) => {
//         state.deletingId = action.meta.arg;
//       })
//       .addCase(removeFeedback.fulfilled, (state, action) => {
//         state.items = state.items.filter(item => item.id !== action.payload);
//         state.deletingId = null;
//       })
//       .addCase(removeFeedback.rejected, (state, action) => {
//         state.error = action.payload;
//         state.deletingId = null;
//       });
//   }
// });

// export default feedbackSlice.reducer;
