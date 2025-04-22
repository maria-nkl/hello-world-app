import { apiSlice } from './apiSlice';

export const feedbackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedback: builder.query({
      query: () => 'feedback',
      providesTags: ['Feedback'],
    }),
    addFeedback: builder.mutation({
      query: (feedbackData) => ({
        url: 'feedback',
        method: 'POST',
        body: feedbackData,
      }),
      invalidatesTags: ['Feedback'],
    }),
    deleteFeedback: builder.mutation({
      query: (feedbackId) => ({
        url: `feedback/${feedbackId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Feedback'],
    }),
  }),
});

export const { 
  useGetFeedbackQuery, 
  useAddFeedbackMutation,
  useDeleteFeedbackMutation 
} = feedbackApi;