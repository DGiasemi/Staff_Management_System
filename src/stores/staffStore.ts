import { create } from 'zustand';

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
  addStaff: (staff: Omit<StaffMember, 'id'>) => void;
  updateStaff: (staff: StaffMember) => void;
  deleteStaff: (id: number) => void;
};

export const useStaffStore = create<StaffStore>((set) => ({
  staff: [],
  fetchStaff: async () => {
    // Mock API call to fetch ALL staff
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
  },
  addStaff: (newStaff) => {
    set((state) => ({
      staff: [...state.staff, { ...newStaff, id: Date.now() }],
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
    set((state) => ({ staff: state.staff.filter((s) => s.id !== id) }));
  },
}));