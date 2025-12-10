"use client";

import { useUsers } from "@/hooks/useUsers";
import "@/styles/account.scss";
import { formatDateRu, pluralAge } from "@/utils/formatDate";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/ui/InputField";

function AccountPage() {
  const { userMap } = useUsers();

  const user = userMap.get(1);
  const userName = `${user?.firstName} ${user?.maidenName} ${user?.lastName}`;
  const role = user?.role;
  const email = user?.email;
  const birthDate = formatDateRu(user?.birthDate);
  const age = pluralAge(user?.age);
  const image = user?.image;

  // ---- Schema ----
  const schema = z.object({
    username: z
      .string()
      .min(3, "ФИО должно быть больше 3 символов")
      .max(100, "ФИО не может быть больше 100 символов"),

    email: z.email("Неверный email"),

    birthday: z.date(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("Форма:", data);
  };

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

      {/* Форма */}
      <div className="account-page__section">
        <h2 className="account-page__section-title">Личные данные</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="account-page__form">
          <InputField
            label="ФИО"
            name="username"
            register={register}
            error={errors.username}
            defaultValue={userName}
            inputProps={{ placeholder: "Введите ФИО" }}
          />

          <InputField
            label="Дата рождения"
            name="birthday"
            type="date"
            register={register}
            error={errors.birthday}
            inputProps={{
              min: "1900-01-01",
              max: "2200-12-31",
            }}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            defaultValue={email}
            inputProps={{ placeholder: "Введите Email" }}
          />

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
