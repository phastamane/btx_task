"use client";

import "@/styles/account.scss";
import { useState } from "react";
import { useUserStore } from "@/store/user.store";
import { role as userRole } from "@/shared/constants/role.constants";
import { formatDateRu, pluralAge } from "@/utils/formatDate";
import { ROLE_COLORS, ROLE_LABELS, UserRole } from "@/shared/constants/roles.constants";
import type { UserInterface } from "@/types/users";
import ChangePasswordModal from "@/components/ui/ChangePasswordModal";

import {
  ACCOUNT_TEXT,
  buildFullName,
  getInitialFormState,
} from "@/shared/constants/account.constants";

interface AccountClientProps {
  user: UserInterface | null;
}

export default function AccountClient({ user: initialUser }: AccountClientProps) {
  const storedUser = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const [passwordModal, setPasswordModal] = useState(false);

  const user = storedUser ?? initialUser;

  if (!user) {
    return <div className="text-center mt-20">{ACCOUNT_TEXT.loading}</div>;
  }

  const [form, setForm] = useState(() => getInitialFormState(user));

  const roleOptions = userRole(user.role);

  const handleSave = () => {
    const [firstName, middleName, lastName] = form.fullName.split(" ");

    const updatedUser: UserInterface = {
      ...user,
      firstName: firstName || user.firstName,
      maidenName: middleName || user.maidenName,
      lastName: lastName || user.lastName,
      email: form.email,
      birthDate: form.birthDate,
      role: form.role,
      gender: user.gender,
      username: user.username,
    };

    setUser(updatedUser);
  };

  const fullName = buildFullName(user);

  return (
    <div className="account-page">
      {/* Верхняя карточка */}
      <div className="account-page__user">
        <div className="account-page__user-container">
          <img
            className="account-page__user-photo"
            src={user.image}
            alt={fullName}
          />

          <div className="account-page__user-data">
            <span
              className="account-page__user-role"
              style={{ backgroundColor: ROLE_COLORS[user.role] }}
            >
              {ROLE_LABELS[user.role]}
            </span>

            <h1 className="account-page__user-name">{fullName}</h1>
            <p className="account-page__user-email">{user.email}</p>

            <span className="account-page__user-birthday">
              <p>{formatDateRu(String(user.birthDate))}</p>
              <p>({pluralAge(user.age)})</p>
            </span>
          </div>
        </div>

        <div
          className="account-page__change-password"
          onClick={() => setPasswordModal(true)}
        >
          {ACCOUNT_TEXT.changePassword}
        </div>
      </div>

      {/* Личные данные */}
      <div className="account-page__section">
        <h2 className="account-page__section-title">
          {ACCOUNT_TEXT.personalDataTitle}
        </h2>

        <div className="account-page__form">
          <div className="account-page__field">
            <label className="account-page__label">
              {ACCOUNT_TEXT.labels.fullName}
            </label>
            <input
              className="account-page__input"
              value={form.fullName}
              onChange={(e) =>
                setForm({ ...form, fullName: e.target.value })
              }
            />
          </div>

          <div className="account-page__field">
            <label className="account-page__label">
              {ACCOUNT_TEXT.labels.birthDate}
            </label>
            <input
              className="account-page__input"
              type="date"
              value={form.birthDate}
              onChange={(e) =>
                setForm({ ...form, birthDate: e.target.value })
              }
            />
          </div>

          <div className="account-page__field">
            <label className="account-page__label">
              {ACCOUNT_TEXT.labels.email}
            </label>
            <input
              className="account-page__input"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="account-select">
            <label className="account-select__label">
              {ACCOUNT_TEXT.labels.role}
            </label>
            <div className="account-select__wrapper">
              <select
                className="account-select__control"
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
          </div>

          <div className="account-page__actions">
            <button
              className="account-page__button"
              onClick={handleSave}
            >
              {ACCOUNT_TEXT.saveButton}
            </button>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={passwordModal}
        onClose={() => setPasswordModal(false)}
      />
    </div>
  );
}
