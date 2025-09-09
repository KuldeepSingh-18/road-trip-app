// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { loginUser as apiLogin, registerUser as apiRegister } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch { return null; }
  });

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [token, user]);

  const login = async (credentials) => {
    const res = await apiLogin(credentials);
    setToken(res.data.token);
    setUser({ _id: res.data._id, username: res.data.username, email: res.data.email });
    return res;
  };

  const register = async (data) => {
    const res = await apiRegister(data);
    setToken(res.data.token);
    setUser({ _id: res.data._id, username: res.data.username, email: res.data.email });
    return res;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
