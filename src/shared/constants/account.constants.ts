// src/shared/constants/account.constants.ts

import type { UserInterface } from "@/types/users";
import { UserRole } from "@/shared/constants/roles.constants";

export const ACCOUNT_TEXT = {
  loading: "Загрузка профиля...",
  changePassword: "Изменить пароль",
  personalDataTitle: "Личные данные",
  saveButton: "Сохранить изменения",

  labels: {
    fullName: "ФИО",
    birthDate: "Дата рождения",
    email: "Email",
    role: "Роль",
  },
};

export const buildFullName = (user: UserInterface) =>
  `${user.firstName} ${user.maidenName} ${user.lastName}`;

export const getInitialFormState = (user: UserInterface) => ({
  fullName: buildFullName(user),
  email: user.email,
  birthDate: user.birthDate,
  role: user.role,
  username: user.username,
  gender: user.gender
});
