"use client";
import { useUsers } from "@/hooks/useUsers";
import { useEffect } from "react";
import { Spinner } from "@heroui/react";
import AdminsTable from "@/components/admins/AdminsTable";
import { ADMINS_CONST } from "@/shared/constants/admins.constants";
import AdminsTableMobile from "@/components/admins/AdminsTableMobile";
import { I18nProvider } from "@react-aria/i18n";
import Modal from "@/components/ui/Modal";
import { useAdminStore } from "@/store/admin.store";

function AdminPage() {
  const {
    admins,
    isLoading: usersLoading,
    isError: usersError,
    error: usersErrorData,
  } = useUsers();
  const { setAdmins, admins: adminList } = useAdminStore();

  useEffect(() => {
    if (admins) {
      setAdmins(admins);
    }
  }, [admins, setAdmins]);

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
              <h1 className="text-3xl font-semibold max-sm:text-xl  max-sm:mr-auto">
                {ADMINS_CONST.title}
              </h1>
              <p className="xl:hidden text-gray-700 text-lg max-sm:text-sm max-sm:mr-auto">
                {ADMINS_CONST.subTitle}
              </p>
              {
                <div className="max-sm:w-full">
                  <Modal page="admins" />
                </div>
              }
            </div>
            <p className="max-xl:hidden text-gray-700 text-lg ">
              {ADMINS_CONST.subTitle}
            </p>
          </div>

          {adminList && (
            <>
              <div className="hidden lg:block">
                <AdminsTable admins={adminList} />
              </div>

              <div className="lg:hidden">
                <AdminsTableMobile admins={adminList} />
              </div>
            </>
          )}
        </div>
      </I18nProvider>
    </>
  );
}

export default AdminPage;
