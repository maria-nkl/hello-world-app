import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null
  },
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem('auth', JSON.stringify({
        isLoggedIn: true,
        user: action.payload
      }));
    },
    logoutSuccess(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('auth');
    }
  }
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;