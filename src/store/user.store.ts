import { create } from "zustand";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  birthDate: string;
  image: string;
  role: string;
}

interface UserStore {
  user: AuthUser | null;

  setUser: (user: AuthUser | null) => void;

  // Новый метод
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),  // ← очистка состояния
}));
