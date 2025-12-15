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
import UsersTableMobile from "@/components/users/UsersTableMobile";

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
          <div className="grid gap-3 mb-5 max-xl:px-0">
            <div className="flex justify-between max-xl:flex-col  max-xl:items-center max-xl:gap-5 max-xl:pt-5 max-sm:px-5">
              <h1 className="text-3xl font-semibold max-sm:text-xl  max-sm:mr-auto">{USERS_CONST.title}</h1>
              <p className="xl:hidden text-gray-700 text-lg max-sm:text-sm max-sm:mr-auto">{USERS_CONST.subTitle}</p>
              {user?.role === 'admin' && <div className="max-sm:w-full"><Modal page="users" /></div>}
            </div>
            <p className="max-xl:hidden text-gray-700 text-lg">{USERS_CONST.subTitle}</p>
          </div>

          {users && usersPostsMap.size > 0 && userCommentsMap.size > 0 && (
            <>
              <div className="hidden lg:block">
                <UsersTable
                  users={users}
                  admins={admins}
                  usersPosts={usersPostsMap}
                  userComments={userCommentsMap}
                />
              </div>
              <div className="lg:hidden">
                <UsersTableMobile
                  users={users}
                  admins={admins}
                  usersPosts={usersPostsMap}
                  userComments={userCommentsMap}
                />
              </div>
            </>
          )}
        </div>
      </I18nProvider>
    </>
  );
}

export default UsersPage;
