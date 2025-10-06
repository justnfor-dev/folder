import { create } from 'zustand';
import { User, Role } from '../types';

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  setRole: (role: Role) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@akyol.kz',
    role: 'manager',
  },
  setUser: (user) => set({ user }),
  setRole: (role) => set((state) => ({ user: state.user ? { ...state.user, role } : null })),
}));
