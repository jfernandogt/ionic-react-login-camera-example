// AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  isAuthenticated: boolean | null;
  login: (obj: { email: string; password: string }) => boolean;
  logout: () => void;
  register: (obj: { email: string; password: string }) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la página
    const userLoggedIn = JSON.parse(
      localStorage.getItem("isAuthenticated") ?? "false"
    );
    setIsAuthenticated(userLoggedIn);
  }, []);

  const login = ({ email, password }: { email: string; password: string }) => {
    const users = JSON.parse(localStorage.getItem("users") ?? "[]");
    if (
      users.find(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password
      )
    ) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      return true;
    }

    return false;
  };

  const register = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const users = JSON.parse(localStorage.getItem("users") ?? "[]");

    if (
      users.find(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password
      )
    ) {
      return false;
    }

    users.push({
      email,
      password,
    });

    localStorage.setItem("users", JSON.stringify(users));

    return true;
  };

  const logout = () => {
    // Lógica de cierre de sesión
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {isAuthenticated === null ? "Loading..." : null}
      {isAuthenticated !== null ? children : null}
    </AuthContext.Provider>
  );
};
