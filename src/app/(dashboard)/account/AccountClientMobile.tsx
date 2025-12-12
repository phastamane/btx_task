"use client";

import { useState } from "react";
import { useUserStore } from "@/store/user.store";
import { role as userRole } from "@/shared/constants/role.constants";
import { formatDateRu, pluralAge } from "@/utils/formatDate";
import { ROLE_COLORS, ROLE_LABELS } from "@/shared/constants/roles.constants";
import type { UserInterface } from "@/types/users";
import ChangePasswordModal from "@/components/ui/ChangePasswordModal";

interface AccountClientProps {
  user: UserInterface | null;
}
type UserRole = "admin" | "moderator" | "user";

export default function AccountClientMobile({
  user: initialUser,
}: AccountClientProps) {
  const storedUser = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const [passwordModal, setPasswordModal] = useState(false);

  const user = storedUser ?? initialUser;

  if (!user)
    return <div className="text-center mt-10">Загрузка профиля...</div>;

  const [form, setForm] = useState({
    fullName: `${user.firstName} ${user.maidenName} ${user.lastName}`,
    email: user.email,
    birthDate: user.birthDate,
    role: user.role as UserRole,
    username: user.username,
  });

  const roleOptions = userRole(user.role);

  const handleSave = () => {
    const [firstName, middleName, lastName] = form.fullName.split(" ");

    const updatedUser = {
      ...user,
      firstName: firstName || user.firstName,
      maidenName: middleName || user.maidenName,
      lastName: lastName || user.lastName,
      email: form.email,
      birthDate: String(form.birthDate),
      role: form.role as UserRole,
      username: user.username,
    };

    setUser(updatedUser);
  };

  const fullName = `${user.firstName} ${user.maidenName} ${user.lastName}`;

  return (
    <div className="flex flex-col pb-10">
      <div className="rounded-2xl p-4 flex flex-col gap-3">
        
         
          <div className="flex flex-col gap-2 items-center">
             <img
            className="w-20 h-20 rounded-full object-cover"
            src={user.image}
            alt=""
          />
            <span
              className="text-sm w-fit px-2 py-1 rounded-lg"
              style={{ backgroundColor: ROLE_COLORS[user.role as UserRole] }}
            >
              {ROLE_LABELS[user.role as UserRole]}
            </span>
            <h1 className="text-xl font-semibold">{fullName}</h1>
            <p className="text-sm text-blue-500 break-all">{user.email}</p>
            <div className="flex gap-2 text-sm text-gray-700 items-center">
              <span>{formatDateRu(String(user.birthDate))}</span>
              <span className="text-xs text-gray-500">({pluralAge(user.age)})</span>
            </div>
          </div>
        

        <button
          className="text-blue-500 text-sm"
          onClick={() => setPasswordModal(true)}
        >
          Изменить пароль
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-4 pb-20">
        <h2 className="text-lg font-semibold ">Личные данные</h2>

        <div className="flex flex-col gap-3">
          <label className="text-sm text-gray-600 font-extralight">ФИО</label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />

          <label className="text-sm text-gray-600 font-extralight">
            Дата рождения
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
            type="date"
            value={form.birthDate}
            onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
          />

          <label className="text-sm text-gray-600 font-extralight">Email</label>
          <input
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label className="text-sm text-gray-600 font-extralight">Роль</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base bg-white"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value as UserRole })
            }
          >
            {roleOptions.map((r) => (
              <option key={r.key} value={r.key}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className="mt-2 bg-gray-300 text-gray-600 py-3 rounded-lg"
          onClick={handleSave}
        >
          Сохранить изменения
        </button>
      </div>

      <ChangePasswordModal
        isOpen={passwordModal}
        onClose={() => setPasswordModal(false)}
      />
    </div>
  );
}
