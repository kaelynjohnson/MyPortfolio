// AuthContext.jsx - shared state that remembers who is signed in, and their role
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { apiRequest } from '../api.js';

const AuthContext = createContext(null);

// Wraps the whole app so every page can see who is signed in
export function AuthProvider({ children }) {
  // Start from the saved user (if any) so a page refresh does not sign the user out
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Sign in with email and password, then remember the token and user
  const signin = async (email, password) => {
    const data = await apiRequest('/auth/signin', 'POST', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };

  // Sign out on the server, then forget the token and user
  const signout = async () => {
    try {
      await apiRequest('/auth/signout');
    } catch (error) {
      console.error('Sign out request failed:', error);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAdmin = user !== null && user.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAdmin, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Lets any component read the sign-in information
export function useAuth() {
  return useContext(AuthContext);
}