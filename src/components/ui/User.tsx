"use client";

import { User as HeroUIUser } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user.store";
import UserSkeleton from "./UserSkeleton";
import { truncateText } from "@/utils/truncrcateText";

export default function User() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);

  if(!user)
    return <UserSkeleton/>

  return (
    <HeroUIUser
      avatarProps={{
        src: user?.image,
      }}
      description={
        <a className='text-blue-500 cursor-pointer text-base max-sm:text-xs' onClick={() => router.push("/account")}>
          @{truncateText(user?.username, 12)}
        </a>
      }
      name={<p className="max-sm:text-xs">{user?.firstName + " " + user?.lastName}</p>}
    />
  );
}
