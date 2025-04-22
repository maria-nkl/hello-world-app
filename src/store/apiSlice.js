import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ 
  baseUrl: 'http://localhost:3001/',
  prepareHeaders: (headers, { getState }) => {
    // Добавляем токен авторизации, если есть
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Feedback'],
  endpoints: () => ({}),
});