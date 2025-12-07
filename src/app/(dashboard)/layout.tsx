"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import {
  UsersIcon,
  AdminsIcon,
  PostsIcon,
  ExitIcon,
} from "@/components/icons/Icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import User from "@/components/ui/User";

const queryClient = new QueryClient();

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const buttons = [
    { icon: PostsIcon, desc: "Публикации", link: "/posts" },
    { icon: AdminsIcon, desc: "Администраторы", link: "/admins" },
    { icon: UsersIcon, desc: "Пользователи", link: "/users" },
  ];
  const [pressedBut, setPressedBut] = useState<number>();

  return (
    <div className=" flex bg-blue-100">
      <div className="flex flex-col w-1/6 p-6 pb-21 justify-between bg-white">
        <div className="flex flex-col items-center">
          <div className="pb-10">
            <img src="/BTX.svg" alt="logo" />
          </div>

          <div className="flex flex-col gap-4 items-start">
            {buttons.map((button, i) => {
              const Icon = button.icon;
              return (
                <div className="flex" key={button.desc}>
                  <Button
                    onPress={() => {
                      router.push(button.link);
                      setPressedBut(i);
                    }}
                    key={button.link}
                    color="primary"
                    variant="light"
                    className={`justify-start w-55 text-black
                    ${i === pressedBut && "bg-blue-200 text-blue-600"}`}
                    startContent={
                      <Icon
                        color={i === pressedBut ? "#006fee" : "#000"}
                        size={20}
                        className=""
                      />
                    }
                  >
                    {button.desc}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col bg-blue-50 p-3 rounded-xl">
          <div className="justify-self-start"><User/></div>
          <Button
            className="bg-blue-200 text-[#006fee]"
            startContent={<ExitIcon />}
          >
            Выход
          </Button>
        </div>
      </div>

      <div className="w-full bg-blue-100 pb-5 min-h-[100dvh]">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </div>
    </div>
  );
}
