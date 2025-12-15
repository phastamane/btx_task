import { cookies } from "next/headers";
import AccountClient from "./AccountClient";
import AccountClientMobile from "./AccountClientMobile";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;

  const user = userCookie ? JSON.parse(userCookie) : null;

  return (
    <>
      <div className="hidden md:block">
        <AccountClient user={user} />
      </div>
      <div className="md:hidden">
        <AccountClientMobile user={user} />
      </div>
    </>
  );
}
