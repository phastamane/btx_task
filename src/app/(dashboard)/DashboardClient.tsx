"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import User from "@/components/ui/User";
import { useUserStore } from "@/store/user.store";
import { useLogout } from "@/hooks/useLogout";
import { Button } from "@heroui/react";
import { useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ExitIcon } from "@/components/icons/Icons";
import { DASHBOARD_NAV } from "@/shared/constants/dashboardNav.constants";

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
  }, [user, setUser]);

  return (
    <div className="flex bg-blue-100">
      {/* Sidebar */}
      <div className="flex flex-col w-1/6 p-6 justify-between bg-white max-xl:w-1/5 max-lg:hidden">
        <div className="flex flex-col items-center">
          <div className="pb-10">
            <img src="/BTX.svg" alt="logo" />
          </div>

          <div className="flex flex-col gap-4 items-start w-full">
            {DASHBOARD_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);

              return (
                <Button
                  key={item.key}
                  className={`text-start justify-start w-full px-5 ${
                    isActive ? "bg-blue-200 text-blue-600" : "text-black"
                  }`}
                  variant="light"
                  startContent={
                    <Icon
                      size={20}
                      color={isActive ? "#006fee" : "#000"}
                    />
                  }
                  onPress={() => router.push(item.href)}
                >
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start bg-blue-50 p-3 rounded-xl">
          <User />
          <Button
            className="bg-blue-100 text-[#006fee] self-center w-full"
            startContent={<ExitIcon />}
            onPress={logout}
          >
            Выход
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col w-full bg-blue-100 min-h-[100dvh] pb-24 p-20 max-xl:p-10 max-lg:p-0">
        {/* Top mobile bar */}
        <div className="flex bg-white justify-center rounded-b-xl items-center lg:hidden">
          <div className="p-3 w-1/4">
            <img src="/BTX.svg" alt="logo" />
          </div>
          <div className="flex p-3 gap-2">
            <User/>
            <Button
              className="bg-blue-200 text-[#006fee] p-0"
              startContent={<ExitIcon />}
              onPress={logout}
            />
          </div>
        </div>

        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>

        {/* Bottom nav */}
        <div className="hidden max-lg:flex fixed bottom-0 left-0 right-0 bg-blue-100 py-3 z-50 gap-2 justify-around border-t-2 border-gray-300">
          {DASHBOARD_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Button
                key={item.key}
                className={`text-xs flex-col w-full h-12 ${
                  isActive ? "text-blue-600" : "text-black"
                }`}
                variant="light"
                startContent={
                  <Icon
                    size={20}
                    color={isActive ? "#006fee" : "#000"}
                  />
                }
                onPress={() => router.push(item.href)}
              >
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
