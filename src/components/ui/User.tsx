import {User as HeroUIUser, Link} from "@heroui/react";

export default function User() {
  return (
    <HeroUIUser
      avatarProps={{
        src: "https://avatars.githubusercontent.com/u/30373425?v=4",
      }}
      description={
        <Link isExternal href="localhost" size="sm">
          @jrgarciadev
        </Link>
      }
      name="Junior Garcia"
    />
  );
}
