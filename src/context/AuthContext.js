import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("sessionToken");
    const username = localStorage.getItem("sessionUser");
    if (token && username) {
      setUser({ username });
    }
  }, []);

  const signup = async ({ email, username, password }) => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[username]) {
      throw new Error("Username already exists");
    }

    users[username] = { email, password };
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  const login = async ({ username, password }) => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (!users[username] || users[username].password !== password) {
      throw new Error("Invalid username or password");
    }

    const sessionToken = Math.random().toString(36).slice(2);
    localStorage.setItem("sessionToken", sessionToken);
    localStorage.setItem("sessionUser", username);

    setUser({ username });
    return true;
  };

  const logout = useCallback(() => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("sessionUser");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
