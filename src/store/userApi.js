import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
      providesTags: ['User'],
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    checkEmail: builder.query({
      query: (email) => `users?email=${email}`,
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'users',
        method: 'POST',
        body: {
          ...userData,
          role: 'user',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: ['User'],
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: `users?email=${email}&password=${password}`,
        method: 'GET',
      }),
      transformResponse: (response) => {
        const user = response[0];
        if (!user) throw new Error('Неверные учетные данные');
        if (!user.isActive) throw new Error('Аккаунт заблокирован');
        return user;
      },
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: {
          ...data,
          updatedAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCheckEmailQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
