"use client";
import { useUsers } from "@/hooks/useUsers";
import { useEffect } from "react";
import { Spinner } from "@heroui/react";
import AdminsTable from "@/components/admins/AdminsTable";
import { ADMINS_CONST } from "@/shared/constants/admins.constants";

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
        <I18nProvider locale='ru-RU'>
          <div>
            <div className="grid gap-3 mb-10">
              <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">{ADMINS_CONST.title}</h1>
                <Modal page="admins"/>
              </div>
              <p className="text-gray-700 text-lg">{ADMINS_CONST.subTitle}</p>
            </div>
      
            {adminList && <AdminsTable admins={adminList} /> }
          </div>
        </I18nProvider>
      
    </>
  );
}

export default AdminPage;
