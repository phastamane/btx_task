"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import User from "@/components/ui/User";
import { useUserStore } from "@/store/user.store";
import { useLogout } from "@/hooks/useLogout";
import { Button } from "@heroui/react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  UsersIcon,
  AdminsIcon,
  PostsIcon,
  ExitIcon,
} from "@/components/icons/Icons";
import { ReactNode } from "react";

const queryClient = new QueryClient();

interface DashboardClientProps {
  user: any;
  children: ReactNode;
}

export default function DashboardClient({
  user,
  children,
}: DashboardClientProps) {
  const setUser = useUserStore((s) => s.setUser);
  const logout = useLogout();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user) setUser(user);
  }, [user]);

  const buttons = [
    { icon: PostsIcon, desc: "Публикации", link: "/posts" },
    { icon: AdminsIcon, desc: "Администраторы", link: "/admins" },
    { icon: UsersIcon, desc: "Пользователи", link: "/users" },
  ];

  return (
    <div className="flex bg-blue-100">
      <div className="flex flex-col w-1/6 p-6 justify-between bg-white max-xl:w-1/5 max-lg:hidden">
        <div className="flex flex-col items-center">
          <div className="pb-10">
            <img src="/BTX.svg" alt="logo" />
          </div>

          <div className="flex flex-col gap-4 items-start">
            {buttons.map((btn) => {
              const Icon = btn.icon;

              const isActive = pathname.startsWith(btn.link);

              return (
                <Button
                  key={btn.link}
                  className={`text-start justify-start w-full px-5 ${
                    isActive ? "bg-blue-200 text-blue-600" : "text-black"
                  }`}
                  variant="light"
                  startContent={
                    <Icon color={isActive ? "#006fee" : "#000"} size={20} />
                  }
                  onPress={() => router.push(btn.link)}
                >
                  {btn.desc}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col bg-blue-50 p-3 rounded-xl">
          <div className="mr-auto">
            <User />
          </div>
          <Button
            className="bg-blue-200 text-[#006fee]"
            startContent={<ExitIcon />}
            onPress={logout}
          >
            Выход
          </Button>
        </div>
      </div>

      <div
        className="
  flex flex-col w-full bg-blue-100
  min-h-[100dvh]
  pb-24
  p-20
  max-xl:p-10
  max-lg:p-0
"
      >
        <div className="flex bg-white justify-center rounded-b-xl items-center lg:hidden">
          <div className="p-3 w-1/4">
            <img src="/BTX.svg" alt="logo" />
          </div>
          <div className="flex p-3 gap-2">
            <div className="mr-auto ">
              <User />
            </div>
            <Button
              className="bg-blue-200 text-[#006fee] p-0 max-w-1/6"
              startContent={<ExitIcon />}
              onPress={logout}
            ></Button>
          </div>
        </div>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <div
          className="
          hidden max-lg:flex
          fixed bottom-0 left-0 right-0
          bg-blue-100
          py-3
          z-50
          gap-4
          justify-around
          border-t border-gray-200
          "
        >
          {buttons.map((btn) => {
            const Icon = btn.icon;

            const isActive = pathname.startsWith(btn.link);

            return (
              <Button
                key={btn.link}
                className={`text-start text-xs flex-col justify-start w-full h-15 ${
                  isActive ? "text-blue-600" : "text-black"
                }`}
                variant="light"
                startContent={
                  <Icon color={isActive ? "#006fee" : "#000"} size={20} />
                }
                onPress={() => router.push(btn.link)}
              >
                {btn.desc}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
