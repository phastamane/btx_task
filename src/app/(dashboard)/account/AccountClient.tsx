"use client";

import "@/styles/account.scss";
import { useState, useEffect } from "react";
import { useUserStore } from "@/store/user.store";
import { role as userRole } from "@/shared/constants/role.constants";
import { formatDateRu, pluralAge } from "@/utils/formatDate";
import { ROLE_COLORS, ROLE_LABELS } from "@/shared/constants/roles.constants";
import type { UserInterface } from "@/types/users";


interface AccountClientProps {
  user: UserInterface | null;
}
type UserRole = "admin" | "moderator" | "user";


export default function AccountClient({ user: initialUser }: AccountClientProps) {
  const storedUser = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const user = storedUser ?? initialUser;

  if (!user) return <div className="text-center mt-20">Загрузка профиля...</div>;

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
    birthDate: String(form.birthDate),    // ✓ фикс
    role: form.role as UserRole,          // ✓ фикс
    username: user.username,
  };

  setUser(updatedUser);
};


  const fullName = `${user.firstName} ${user.maidenName} ${user.lastName}`;

  return (
    <div className="account-page">
      {/* Верхняя карточка */}
      <div className="account-page__user">
        <div className="account-page__user-container">
          <img className="account-page__user-photo" src={user.image} alt="" />

          <div className="account-page__user-data">
            <span
              className="account-page__user-role"
              style={{ backgroundColor: ROLE_COLORS[user.role as UserRole] }}
            >
              {ROLE_LABELS[user.role as UserRole]}
            </span>

            <h1 className="account-page__user-name">{fullName}</h1>
            <p className="account-page__user-email">{user.email}</p>

            <span className="account-page__user-birthday">
              <p>{formatDateRu(String(user.birthDate))}</p>
              <p>({pluralAge(user.age)})</p>
            </span>
          </div>
        </div>

        <div className="account-page__change-password">изменить пароль</div>
      </div>

      {/* Личные данные */}
      <div className="account-page__section">
        <h2 className="account-page__section-title">Личные данные</h2>

        <div className="account-page__form">

          <div className="account-page__field">
            <label className="account-page__label">ФИО</label>
            <input
              className="account-page__input"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>

          <div className="account-page__field">
            <label className="account-page__label">Дата рождения</label>
            <input
              className="account-page__input"
              type="date"
              value={form.birthDate}
              onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
            />
          </div>

          <div className="account-page__field">
            <label className="account-page__label">Email</label>
            <input
              className="account-page__input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="account-select">
            <label className="account-select__label">Роль</label>
            <div className="account-select__wrapper">
              <select
                className="account-select__control"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value as UserRole})
                }
              >
                {roleOptions.map((r) => (
                  <option key={r.key} value={r.key}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="account-page__actions">
            <button className="account-page__button" onClick={handleSave}>
              Сохранить изменения
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
