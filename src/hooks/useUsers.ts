import { useQuery } from "@tanstack/react-query";
import { UsersService } from "@/services/users.servise";
import { useMemo } from "react";
import { UserInterface } from "@/types/users";
import { useLocalUsersStore } from "@/store/localUsers.store";

export function useUsers() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: UsersService.getAll,
  });

  const localUsers = useLocalUsersStore((s) => s.localUsers);
  const deletedIds = useLocalUsersStore((s) => s.deletedIds);

  const { admins, users, userMap } = useMemo(() => {
    const map = new Map<number, UserInterface>();

    //Кладём всех пользователей из API
    data?.users?.forEach((el: UserInterface) => {
      if (deletedIds.includes(el.id)) {
        return;
      }
      map.set(el.id, el);
    });

    // Применяем локальные изменения (новые + отредактированные)
    localUsers.forEach((u) => {
      if (deletedIds.includes(u.id)) {
        return;
      }
      map.set(u.id, u);
    });

    const adminsArr: UserInterface[] = [];
    const usersArr: UserInterface[] = [];

    for (const el of map.values()) {
      if (el.role === "admin") adminsArr.push(el);
      else usersArr.push(el);
    }

    return {
      admins: adminsArr,
      users: usersArr,
      userMap: map,
    };
  }, [data, localUsers, deletedIds]);

  return {
    isLoading,
    isError,
    error,
    users,      
    userMap,
    admins,
  };
}
