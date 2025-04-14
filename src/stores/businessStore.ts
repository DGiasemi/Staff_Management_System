import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const simulateNetworkDelay = async () => 
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));

type BusinessType = "bar" | "restaurant" | "club" | "hotel" | "cafe";

export type Business = {
  id: number;
  name: string;
  location: string;
  type?: BusinessType;
};

type BusinessStore = {
  businesses: Business[];
  isLoading: boolean;
  error: string | null;
  fetchBusinesses: () => Promise<void>;
  addBusiness: (business: Omit<Business, 'id'>) => Promise<number>;
  updateBusiness: (business: Business) => Promise<void>;
  deleteBusiness: (id: number) => Promise<void>;
};

export const useBusinessStore = create<BusinessStore>()(
  persist(
    (set, get) => ({
      businesses: [],
      isLoading: false,
      error: null,

      fetchBusinesses: async () => {
        set({ isLoading: true, error: null });
        try {
          await simulateNetworkDelay();
          
          if (get().businesses.length === 0) {
            const initialData: Business[] = [
              { id: 1, name: "The Gourmet", location: "New York", type: "restaurant" },
              { id: 2, name: "Sky Lounge", location: "Los Angeles", type: "bar" },
              { id: 3, name: "Ocean View", location: "Miami", type: "hotel" },
            ];
            set({ businesses: initialData });
          }
        } catch (error) {
          set({ error: 'Failed to fetch businesses' });
        } finally {
          set({ isLoading: false });
        }
      },

      addBusiness: async (newBusiness) => {
        set({ isLoading: true });
        try {
          await simulateNetworkDelay();
          const newId = Date.now();
          set((state) => ({
            businesses: [...state.businesses, { ...newBusiness, id: newId }],
          }));
          return newId;
        } catch (error) {
          set({ error: 'Failed to add business' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      updateBusiness: async (updatedBusiness) => {
        set({ isLoading: true });
        try {
          await simulateNetworkDelay();
          set((state) => ({
            businesses: state.businesses.map((b) =>
              b.id === updatedBusiness.id ? updatedBusiness : b
            ),
          }));
        } catch (error) {
          set({ error: 'Failed to update business' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      deleteBusiness: async (id) => {
        set({ isLoading: true });
        try {
          await simulateNetworkDelay();
          set((state) => ({
            businesses: state.businesses.filter((b) => b.id !== id),
          }));
        } catch (error) {
          set({ error: 'Failed to delete business' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'business-storage',
      partialize: (state) => ({ businesses: state.businesses }),
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);