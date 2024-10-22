import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(localStorage.getItem('userType') || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  const login = (userType, token) => {
    setUserType(userType);
    setToken(token);
    localStorage.setItem('userType', userType);
    localStorage.setItem('token', token);
    navigate(`/${userType}`, { replace: true }); 
  };

  const logout = () => {
    setUserType(null);
    setToken(null);
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    if (!token) logout();
  }, [token]);

  return (
    <AuthContext.Provider value={{ userType, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
