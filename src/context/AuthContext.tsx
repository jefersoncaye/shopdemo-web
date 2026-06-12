import React, { createContext, useContext, useState, useEffect } from 'react';
import { USUARIOS, type Usuario } from '../data/usuarios';

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, senha: string) => boolean;
  logout: () => void;
  estaLogado: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = 'shopdemo_usuario';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY);
      if (salvo) {
        const parsed = JSON.parse(salvo) as Usuario;
        const encontrado = USUARIOS.find((u) => u.id === parsed.id);
        return encontrado ?? null;
      }
    } catch {
      // ignore parse errors
    }
    return null;
  });

  useEffect(() => {
    if (usuario) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [usuario]);

  function login(email: string, senha: string): boolean {
    const encontrado = USUARIOS.find(
      (u) => u.email === email.trim().toLowerCase() && u.senha === senha
    );
    if (encontrado) {
      setUsuario(encontrado);
      return true;
    }
    return false;
  }

  function logout() {
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, estaLogado: !!usuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
