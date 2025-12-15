import {
  UsersIcon,
  AdminsIcon,
  PostsIcon,
} from "@/components/icons/Icons";

export interface DashboardNavItem {
  key: string;
  label: string;
  href: string;
  icon: React.FC<{ size?: number; color?: string }>;
}

export const DASHBOARD_NAV: DashboardNavItem[] = [
  {
    key: "posts",
    label: "Публикации",
    href: "/posts",
    icon: PostsIcon,
  },
  {
    key: "admins",
    label: "Администраторы",
    href: "/admins",
    icon: AdminsIcon,
  },
  {
    key: "users",
    label: "Пользователи",
    href: "/users",
    icon: UsersIcon,
  },
];
