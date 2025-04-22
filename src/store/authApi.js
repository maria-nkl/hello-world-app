import { apiSlice } from './apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'users',
        method: 'GET',
        params: {
          email: credentials.email,
          password: credentials.password
        }
      }),
      transformResponse: (response) => {
        const user = response[0];
        if (!user) throw new Error('Неверные учетные данные');
        if (!user.isActive) throw new Error('Аккаунт заблокирован');
        return user;
      }
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: 'users',
        method: 'POST',
        body: {
          ...userData,
          role: 'user',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          // Проверяем email перед регистрацией
          const { data: users } = await dispatch(
            authApi.endpoints.checkEmail.initiate(args.email)
          );
          if (users.some(u => u.email === args.email)) {
            throw new Error('Пользователь с таким email уже зарегистрирован');
          }
          await queryFulfilled;
        } catch (error) {
          console.error('Registration error:', error);
          throw error;
        }
      }
    }),
    checkEmail: builder.query({
      query: (email) => `users?email=${email}`,
      providesTags: (result) =>
        result ? [{ type: 'User', id: 'LIST' }] : [],
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation,
  useCheckEmailQuery 
} = authApi;