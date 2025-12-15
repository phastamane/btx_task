import { create } from "zustand";
import { UserInterface } from "@/types/users";

interface UserStore {
  user: UserInterface | null;

  setUser: (user: UserInterface | null) => void;

  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),  // ← очистка состояния
}));
