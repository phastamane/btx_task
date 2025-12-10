"use client";

import "@/styles/account.scss";
import { useEffect } from "react";
import { useUserStore } from "@/store/user.store";
import { formatDateRu, pluralAge } from "@/utils/formatDate";
import { ROLE_COLORS, ROLE_LABELS } from "@/shared/constants/roles.constants";
import { UserInterface } from "@/types/users";

interface AccountClientProps {
  user: UserInterface | null;
}

export default function AccountClient({ user }: AccountClientProps) {



  if (!user)
    return <div className="text-center mt-20">Загрузка профиля...</div>;

  const userName = `${user.firstName} ${user.maidenName} ${user.lastName}`;
  const role = user.role;
  const email = user.email;
  const birthDate = formatDateRu(user.birthDate);
  const age = pluralAge(user.age);
  const image = user.image;

  return (
    <div className="account-page">
      <div className="account-page__user">
        <div className="account-page__user-container">
          <img className="account-page__user-photo" src={image} alt="" />

          <div className="account-page__user-data">
            <span
              className="account-page__user-role"
              style={{ backgroundColor: ROLE_COLORS[role] }}
            >
              {ROLE_LABELS[role]}
            </span>

            <h1 className="account-page__user-name">{userName}</h1>
            <p className="account-page__user-email">{email}</p>

            <span className="account-page__user-birthday">
              <p>{birthDate}</p>
              <p>({age})</p>
            </span>
          </div>
        </div>

        <div className="account-page__change-password">изменить пароль</div>
      </div>

      <div className="account-page__section">
        <h2 className="account-page__section-title">Личные данные</h2>

        <div className="account-page__form">
          <div className="account-page__field">
            <label className="account-page__label">ФИО</label>
            <input
              className="account-page__input"
              defaultValue={userName}
              placeholder="Введите ФИО"
            />
          </div>

          <div className="account-page__field">
            <label className="account-page__label">Email</label>
            <input
              className="account-page__input"
              defaultValue={email}
              placeholder="Введите Email"
            />
          </div>

          <div className="account-page__field">
            <label className="account-page__label">Дата рождения</label>
            <input
              className="account-page__input"
              type="date"
              defaultValue={user.birthDate}
            />
          </div>

          <div className="account-page__actions">
            <button className="account-page__button">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  );
}
