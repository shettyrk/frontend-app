import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user on startup
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    // 🔸 For now, use mock validation
    if (email === "test@candles.com" && password === "123456") {
      const mockUser = { name: "Rama Shetty", email, token: "mock-jwt-token" };
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const signup = async (name, email, password) => {
    // 🔸 Just mock saving for now
    const mockUser = { name, email, token: "mock-jwt-token" };
    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
