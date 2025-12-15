import { create } from "zustand";
import type { UserInterface } from "@/types/users";

interface LocalUsersState {

  localUsers: UserInterface[];

 
  deletedIds: number[];

  addLocalUser: (user: UserInterface) => void;
  updateLocalUser: (user: UserInterface) => void;
  deleteLocalUser: (id: number) => void;
}

export const useLocalUsersStore = create<LocalUsersState>((set) => ({
  localUsers: [],
  deletedIds: [],

  addLocalUser: (user) =>
    set((state) => ({
      localUsers: [...state.localUsers, user],
    })),

  updateLocalUser: (updated) =>
    set((state) => ({
      localUsers: state.localUsers.some((u) => u.id === updated.id)
        ? state.localUsers.map((u) => (u.id === updated.id ? updated : u))
        : [...state.localUsers, updated], // если редактируем API-шного — просто кладём override
    })),

  deleteLocalUser: (id) =>
    set((state) => ({
      deletedIds: [...state.deletedIds, id],
      localUsers: state.localUsers.filter((u) => u.id !== id),
    })),
}));
