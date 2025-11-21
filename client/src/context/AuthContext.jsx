// context/AuthContext.jsx
// Provides user authentication state across the app

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

   const login = (userData) => {
    console.log("Login - Saving user data:", userData); // Debug
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    console.log("Login - Token saved:", userData.token ? "Yes" : "No"); // Debug
  };

  // ✅ UPDATED LOGOUT WITH CONFIRMATION
  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};