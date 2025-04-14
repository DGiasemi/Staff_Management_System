import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type BusinessType = "bar" | "restaurant" | "club" | "hotel" | "cafe";

export type Business = {
  id: number;
  name: string;
  location: string;
  type?: BusinessType;
};

type BusinessStore = {
  businesses: Business[];
  fetchBusinesses: () => Promise<void>;
  addBusiness: (business: Omit<Business, 'id'>) => Promise<number>;
  updateBusiness: (business: Business) => void;
  deleteBusiness: (id: number) => void;
};

export const useBusinessStore = create<BusinessStore>()(
  persist(
    (set, get) => ({
      businesses: [],
      fetchBusinesses: async () => {
        if (get().businesses.length === 0) {
          const initialData: Business[] = [
            { id: 1, name: "The Gourmet", location: "New York", type: "restaurant" },
            { id: 2, name: "Sky Lounge", location: "Los Angeles", type: "bar" },
            { id: 3, name: "Ocean View", location: "Miami", type: "hotel" },
          ];
          set({ businesses: initialData });
        }
      },
      addBusiness: async (newBusiness) => {
        const newId = Date.now();
        set((state) => ({
          businesses: [...state.businesses, { ...newBusiness, id: newId }],
        }));
        return newId;
      },
      updateBusiness: (updatedBusiness) => {
        set((state) => ({
          businesses: state.businesses.map((b) =>
            b.id === updatedBusiness.id ? updatedBusiness : b
          ),
        }));
      },
      deleteBusiness: (id) => {
        set((state) => ({
          businesses: state.businesses.filter((b) => b.id !== id),
        }));
      },
    }),
    {
      name: 'business-storage',
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