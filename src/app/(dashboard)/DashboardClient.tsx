"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import User from "@/components/ui/User";
import { useUserStore } from "@/store/user.store";
import { useLogout } from "@/hooks/useLogout";
import { Button } from "@heroui/react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UsersIcon, AdminsIcon, PostsIcon, ExitIcon } from "@/components/icons/Icons";
import { ReactNode } from "react";

const queryClient = new QueryClient();

interface DashboardClientProps {
  user: any;
  children: ReactNode;
}

export default function DashboardClient({ user, children }: DashboardClientProps) {
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
      <div className="flex flex-col w-1/6 p-6 justify-between bg-white">

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
                  className={`justify-start w-55 ${
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
          <div className="mr-auto"><User /></div>
          <Button
            className="bg-blue-200 text-[#006fee]"
            startContent={<ExitIcon />}
            onPress={logout}
          >
            Выход
          </Button>
        </div>
      </div>

      <div className="flex flex-col w-full bg-blue-100 pb-5 min-h-[100vh] pt-20 px-20">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </div>
    </div>
  );
}
