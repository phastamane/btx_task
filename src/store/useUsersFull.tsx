import { useUsers } from "@/hooks/useUsers";
import { useLocalUsersStore } from "@/store/localUsers.store";
import { useMemo } from "react";

export function useUsersFull() {
  const { users: apiUsers } = useUsers();

  const localUsers = useLocalUsersStore((s) => s.localUsers);

  const finalUsers = useMemo(() => {
    // 1. копируем API пользователей
    const base = [...apiUsers];

    // 2. обновляем тех, кто редактирован
    localUsers.forEach((local) => {
      const index = base.findIndex((u) => u.id === local.id);

      if (index !== -1) {
        // Редактирование
        base[index] = local;
      } else {
        base.push(local);
      }
    });

    return base;
  }, [apiUsers, localUsers]);

  return {
    users: finalUsers,
    admins: finalUsers.filter((u) => u.role === "admin"),
  };
}
