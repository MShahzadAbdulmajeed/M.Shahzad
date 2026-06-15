import { useState } from 'react';

const SESSION_KEY = 'portfolio_admin_auth';
const PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

export function useAdminAuth() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true');

  const login = (password: string): boolean => {
    if (password === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  return { authed, login, logout };
}
