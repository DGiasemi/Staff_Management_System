import { create } from 'zustand';

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
  addBusiness: (business: Omit<Business, 'id'>) => void;
  updateBusiness: (business: Business) => void;
  deleteBusiness: (id: number) => void;
};

export const useBusinessStore = create<BusinessStore>((set) => ({
  businesses: [],
  fetchBusinesses: async () => {
    // Mock API call
    const mockBusinesses: Business[] = [
      { id: 1, name: "The Gourmet", location: "New York", type: "restaurant" },
      { id: 2, name: "Sky Lounge", location: "Los Angeles", type: "bar" },
      { id: 3, name: "Ocean View", location: "Miami", type: "hotel" },
    ];
    set({ businesses: mockBusinesses });
  },
  addBusiness: (newBusiness) => {
    set((state) => ({
      businesses: [...state.businesses, { ...newBusiness, id: Date.now() }]
    }));
  },
  updateBusiness: (updatedBusiness) => {
    set((state) => ({
      businesses: state.businesses.map(b => 
        b.id === updatedBusiness.id ? updatedBusiness : b
      )
    }));
  },
  deleteBusiness: (id) => {
    set((state) => ({
      businesses: state.businesses.filter(b => b.id !== id)
    }));
  },
}));