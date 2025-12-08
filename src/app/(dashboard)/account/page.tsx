"use client";

import React, { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import "@/styles/account.scss";
import { formatDateRu, pluralAge } from "@/utils/formatDate";

function AccountPage() {
  const [dateInput, setDateInput] = useState<string>();

  const { userMap } = useUsers();

  const user = userMap.get(1);
  const userName = `${user?.firstName} ${user?.maidenName} ${user?.lastName}`;
  const role = user?.role;
  const email = user?.email;
  const birthDate = formatDateRu(user?.birthDate);
  const age = pluralAge(user?.age);
  const image = user?.image;

  return (
    <div className="account-page">
      {/* Блок инфо пользователя */}
      <div className="account-page__user">
        <div className="account-page__user-container">
          <img className="account-page__user-photo" src={image} alt="" />

          <div className="account-page__user-data">
            <span
              className="account-page__user-role"
              style={{
                backgroundColor:
                  role === "admin"
                    ? "#F5A524"
                    : role === "moder"
                    ? "#17c964"
                    : "#D4D4D8",
              }}
            >
              {role}
            </span>

            <h1 className="account-page__user-name">{userName}</h1>

            <p className="account-page__user-email">{email}</p>

            <span className="account-page__user-birthday">
              <p className="account-page__user-birth">{birthDate}</p>
              <p className="account-page__user-age">({age})</p>
            </span>
          </div>
        </div>

        <div className="account-page__change-password">изменить пароль</div>
      </div>

      {/* Форма аккаунта */}
      <div className="account-page__section">
        <h2 className="account-page__section-title">Личные данные</h2>

        <form className="account-page__form">
          <div className="account-page__field">
            <label className="account-page__label">ФИО</label>
            <input
              className="account-page__input"
              type="text"
              placeholder="Алексеев Давид Иванович"
              required
            />
          </div>

          <div className="account-page__field">
            <label className="account-page__label">Дата рождения</label>
            <input
              className="account-page__input"
              type="date"
              id="start"
              name="trip-start"
              onChange={(e) => setDateInput(e.target.value)}
              value={dateInput || ""}
              required
              min="1900-01-01"
              max="2200-12-31"
            />
          </div>

          <div className="account-page__field">
            <label className="account-page__label">Email</label>
            <input
              className="account-page__input"
              type="email"
              placeholder="jrgarciadev@example.com"
              required
            />
          </div>

          <div className="account-page__field">
            <label className="account-page__label">Роль</label>
            <select className="account-page__select">
              <option>Администратор</option>
              <option>Пользователь</option>
            </select>
          </div>

          <div className="account-page__actions">
            <button type="submit" className="account-page__button">
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountPage;
