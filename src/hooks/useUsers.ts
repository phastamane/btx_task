import { useQuery } from "@tanstack/react-query";
import { UsersService } from "@/services/users.servise";
import { useMemo } from "react";
import { UserInterface } from "@/types/users";

export function useUsers() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: UsersService.getAll,
  });

  const { admins, userMap } = useMemo(() => {
    const map = new Map<number, UserInterface>();
    const adminsArr: UserInterface[] = [];
    const usersArr: UserInterface[] = [];

    data?.users?.forEach((el: UserInterface) => {
      map.set(el.id, el);
      if (el.role === "admin") adminsArr.push(el);
      else usersArr.push(el)
    });

    return {
      admins: adminsArr,
      users: usersArr,
      userMap: map,
    };
  }, [data]);

  return {
    isLoading,
    isError,
    error,
    users: data?.users ?? [],
    userMap,
    admins,

  };
}
