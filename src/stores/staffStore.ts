import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StaffPosition = "kitchen" | "service" | "PR";

export type StaffMember = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  position: StaffPosition;
  businessId: number;
  phoneNumber?: string;
};

type StaffStore = {
  staff: StaffMember[];
  fetchStaff: () => Promise<void>;
  addStaff: (staff: StaffMember) => void;
  updateStaff: (staff: StaffMember) => void;
  deleteStaff: (id: number) => void;
};

export const useStaffStore = create<StaffStore>()(
  persist(
    (set, get) => ({
      staff: [],
      fetchStaff: async () => {
        if (get().staff.length === 0) {
          const mockStaff: StaffMember[] = [
            {
              id: 1,
              firstName: "John",
              lastName: "Doe",
              email: "john@example.com",
              position: "service",
              businessId: 1,
              phoneNumber: "+1234567890",
            },
            {
              id: 2,
              firstName: "Jane",
              lastName: "Smith",
              email: "jane@example.com",
              position: "kitchen",
              businessId: 2,
            },
          ];
          set({ staff: mockStaff });
        }
      },
      addStaff: (newStaff) => {
        set((state) => ({
          staff: [...state.staff, newStaff],
        }));
      },
      updateStaff: (updatedStaff) => {
        set((state) => ({
          staff: state.staff.map((s) =>
            s.id === updatedStaff.id ? updatedStaff : s
          ),
        }));
      },
      deleteStaff: (id) => {
        set((state) => ({
          staff: state.staff.filter((s) => s.id !== id),
        }));
      },
    }),
    {
      name: 'staff-storage',
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