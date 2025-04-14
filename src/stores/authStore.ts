import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const simulateNetworkDelay = async () => 
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));

type AuthStore = {
  user: null | { email: string };
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          await simulateNetworkDelay();
          
          if (email === 'admin@example.com' && password === 'password123') {
            set({ user: { email } });
            return true;
          }
          set({ error: 'Invalid credentials' });
          return false;
        } catch (error) {
          set({ error: 'Login failed' });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },
      logout: async () => {
        set({ isLoading: true });
        try {
          await simulateNetworkDelay();
          set({ user: null });
          localStorage.removeItem('auth-storage');
        } catch (error) {
          set({ error: 'Logout failed' });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);