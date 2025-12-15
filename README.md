# BTX Admin Panel

Админка для работы с пользователями, администраторами, постами и комментариями на базе Next.js 16. Проект уже адаптирован под мобильные устройства и использует dummyjson.com как источник данных.

## Возможности
- Авторизация с сохранением токенов в httpOnly cookies.
- Таблицы с сортировкой, фильтрацией, пагинацией и карточками для mobile (посты, пользователи, администраторы, комментарии).
- Просмотр детальных комментариев к посту.
- Личный кабинет с редактированием профиля и сменой пароля (клиентская заглушка).
- Глобальный not-found экран в стиле формы логина.

## Технологии
- Next.js 16, React 19, TypeScript
- HeroUI (NextUI v2), Tailwind (TW4)
- TanStack Query, Zustand
- Axios, dummyjson API

## Запуск
```bash
git clone https://github.com/phastamane/btx_task.git
cd btx_task
npm install
npm run dev
```
Приложение поднимется на `http://localhost:3000`.

## Авторизация
Используется публичный dummyjson эндпоинт `https://dummyjson.com/auth/login`.
Пример тестовых данных:
- admin
- `username`: `emilys`
- `password`: `emilyspass`

- user
- `username`: `avah`
- `password`: `avahpass`

## Структура
- `src/app` — страницы, макет, not-found
- `src/components` — таблицы, UI, иконки
- `src/hooks` — работа с таблицами и данными
- `src/services` — запросы к API
- `src/store` — Zustand стора
- `src/shared/constants` — тексты, колонки, роли

## Особенности
- Middleware (proxy) ограничивает доступ к `/admins` и редиректит авторизованных с `/sign-in`.
- Мобильные версии таблиц выводятся отдельными компонентами.
- Данные берутся из dummyjson, но для демонстрации работы с таблицей реализована иммитация запроса на сервер, а так же регистрация изменений локально