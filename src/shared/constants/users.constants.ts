
export const USERS_COLUMNS = [
  { key: "fullName", label: "Пользователь" },
  { key: "email", label: "Email", sorting: false },
  { key: "birthInfo", label: "Дата рождения", sorting: false },
  { key: "gender", label: "Пол", sorting: true},
  { key: "posts", label: "Посты", sorting: false },
  { key: "likes", label: "Лайки", sorting: true },
  { key: "comments", label: "Комментарии", sorting: true },
  { key: "role", label: "Роль", sorting: true },
  { key: "actions", label: "", sorting: false },
];


export const USERS_CONST = {
    title: 'Пользователи',
    subTitle: 'Управление пользователями системы',
    button: "Добавить пользователя",
    modalTitle: 'Добавление пользователя',
    modalButton: 'Сохранить'
}