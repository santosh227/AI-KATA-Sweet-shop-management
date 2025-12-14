import { createContext, useContext, useState } from 'react';
import { registerUser, loginUser } from '../api/authApi';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const register = async ({ name, email, password }) => {
    try {
      const result = await registerUser({ name, email, password });
      if (result.token && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: result.message || 'Registration failed' };
    } catch (err) {
      console.error('Register error (frontend):', err);
      return { success: false, message: err.message };
    }
  };

  const login = async (email, password) => {
    try {
      const result = await loginUser(email, password);
      if (result.token && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: result.message || 'Login failed' };
    } catch (err) {
      console.error('Login error (frontend):', err);
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
