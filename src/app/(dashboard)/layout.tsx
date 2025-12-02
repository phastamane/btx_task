"use client";
import { Button } from "@heroui/react";
import {
  UsersIcon,
  AdminsIcon,
  PostsIcon,
  ExitIcon
} from "@/components/icons/SideBarIcons";
import {QueryClient, QueryClientProvider } from "@tanstack/react-query";
 const queryClient = new QueryClient()
export default function DashboardLayout({children}: Readonly<{children: React.ReactNode;}>) {
  const buttons = [
    { icon: PostsIcon, desc: "Публикации" },
    { icon: AdminsIcon, desc: "Администраторы" },
    { icon: UsersIcon, desc: "Пользователи" },
  ];

  return (
    <div className="h-screen flex pb-10 bg-blue-100">
      <div className="flex flex-col w-1/6 p-8 pb-21 justify-between bg-white">
        <div className="flex flex-col justify-self-center items-center" >
          <div className="pb-10">
            <img src="/BTX.svg" alt="logo" />
          </div>

          <div className="flex flex-col gap-4 items-start">
            {buttons.map((button) => {
              const Icon = button.icon;
              return (
                <div className="flex" key={button.desc}>
                  <Button color="primary" variant="light" className="justify-start w-55 text-black" startContent={<Icon/>}>
                    {button.desc}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col bg-blue-50 p-3 rounded-xl">
            <div className="flex items-start">
              <img src="admins.svg" alt="" />

              <div className="grid items-start">
                <p>name</p>
                <p className="text-[#006fee] text-bold">username</p>
              </div>
            </div>
            <Button className="bg-blue-200 text-[#006fee]" startContent={<ExitIcon/>}>Выход</Button>

        </div>
      </div>

      <div className="w-full bg-blue-100">

          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

      </div>
    </div>
  );
}
