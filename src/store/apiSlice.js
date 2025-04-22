import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ 
  baseUrl: 'http://localhost:3001/',
  prepareHeaders: (headers) => {
    // Если в будущем решишь хранить токен — можно вернуть эту логику
    return headers;
  }
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Feedback'],
  endpoints: () => ({}),
});
