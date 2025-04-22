import { createContext, useContext, useState, useEffect } from 'react';
import { 
  useLoginUserMutation, 
  useRegisterUserMutation, 
  useUpdateUserMutation 
} from '../store/userApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [loginMutation] = useLoginUserMutation();
  const [registerMutation] = useRegisterUserMutation();
  const [updateMutation] = useUpdateUserMutation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const userData = await loginMutation(credentials).unwrap();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const newUser = await registerMutation(userData).unwrap();
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      if (!user) throw new Error('Пользователь не авторизован');

      const updatedFields = {
        ...updatedData,
        password: updatedData.password || user.password,
      };

      const updatedUser = await updateMutation({ id: user.id, data: updatedFields }).unwrap();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
