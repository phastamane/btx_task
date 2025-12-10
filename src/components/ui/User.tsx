"use client";

import { User as HeroUIUser } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user.store";

export default function User() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);

  return (
    <HeroUIUser
      avatarProps={{
        src: user?.image,
      }}
      description={
        <a className='text-blue-500 cursor-pointer text-base' onClick={() => router.push("/account")}>
          @{user?.username}
        </a>
      }
      name={user?.firstName + " " + user?.lastName}
    />
  );
}
