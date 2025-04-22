import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Feedback'],
  endpoints: (builder) => ({
    getFeedback: builder.query({
      query: () => '/feedback',
      providesTags: ['Feedback'],
    }),
    addFeedback: builder.mutation({
      query: (feedbackData) => ({
        url: '/feedback',
        method: 'POST',
        body: feedbackData,
      }),
      invalidatesTags: ['Feedback'],
    }),
    deleteFeedback: builder.mutation({
      query: (feedbackId) => ({
        url: `/feedback/${feedbackId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Feedback'],
    }),
  }),
});

export const {
  useGetFeedbackQuery,
  useAddFeedbackMutation,
  useDeleteFeedbackMutation,
} = api;