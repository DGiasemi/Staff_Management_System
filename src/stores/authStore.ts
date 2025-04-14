import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  user: null | { email: string };
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: (email, password) => {
        if (email === 'admin@example.com' && password === 'password123') {
          set({ user: { email } });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null });
        localStorage.removeItem('auth-storage');
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);