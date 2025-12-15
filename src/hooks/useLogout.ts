"use client";

import { useUserStore } from "@/store/user.store";

export function useLogout() {
  return async () => {
    // вызываем серверный logout
    await fetch("/api/logout", {
      method: "POST",
    });

    // сбрасываем Zustand
    useUserStore.getState().clearUser();

    // редирект на логин
    window.location.href = "/login";
  };
}
