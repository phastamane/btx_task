export enum UserRole {
  ADMIN = "admin",
  MODER = "moder",
  USER = "user",
}

export const ROLE_COLORS: Record<UserRole, string> = {
  [UserRole.ADMIN]: "#F5A524",
  [UserRole.MODER]: "#17c964",
  [UserRole.USER]: "#D4D4D8",
};

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Администратор",
  [UserRole.MODER]: "Модератор",
  [UserRole.USER]: "Пользователь",
};
