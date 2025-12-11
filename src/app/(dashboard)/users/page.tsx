"use client";
import { useUsers } from "@/hooks/useUsers";
import { Spinner } from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";
import Modal from "@/components/ui/Modal";
import { USERS_CONST } from "@/shared/constants/users.constants";
import UsersTable from "@/components/users/UsersTable";
import { usePosts } from "@/hooks/usePosts";
import { useComments } from "@/hooks/useComments";
import { useUserStore } from "@/store/user.store";
import { useUsersFull } from "@/store/useUsersFull";

function UsersPage() {
  const {
    admins,
    isLoading: usersLoading,
    isError: usersError,
    error: usersErrorData,
  } = useUsers();
  
  const { users } = useUsersFull();

  const user = useUserStore((s) => s.user)

  const { usersPostsMap } = usePosts();
  const { userCommentsMap } = useComments();

  if (usersLoading) {
    return (
      <div className="flex justify-center pt-40">
        <Spinner size="lg" label="Загрузка данных..." />
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="text-red-600 text-xl p-10">
        Ошибка загрузки данных:
        <pre>{usersErrorData?.message}</pre>
      </div>
    );
  }
  return (
    <>
      <I18nProvider locale="ru-RU">
        <div>
          <div className="grid gap-3 mb-10">
            <div className="flex justify-between">
              <h1 className="text-3xl font-semibold">{USERS_CONST.title}</h1>
              {user?.role === 'admin' && <Modal page="users" />}
            </div>
            <p className="text-gray-700 text-lg">{USERS_CONST.subTitle}</p>
          </div>

          {users && usersPostsMap.size > 0 && userCommentsMap.size > 0 && (
            <UsersTable
              users={users}
              admins={admins}
              usersPosts={usersPostsMap}
              userComments={userCommentsMap}
            />
          )}
        </div>
      </I18nProvider>
    </>
  );
}

export default UsersPage;
