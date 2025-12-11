import { create } from "zustand";
import { UserInterface } from "@/types/users";

interface AdminStore {
  admins: UserInterface[];
  setAdmins: (admins: UserInterface[]) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  admins: [],
  setAdmins: (admins) => set({ admins }),
}));
