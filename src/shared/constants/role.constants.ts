export const role = (context: string) =>
    context === "admin"
      ? [
          { key: "admin", label: "Администратор" },
          { key: "moderator", label: "Модератор" },
          { key: "user", label: "Автор" },
        ]
      : [
          { key: "moderator", label: "Модератор" },
          { key: "user", label: "Автор" },
        ];