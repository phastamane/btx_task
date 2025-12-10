import { cookies } from "next/headers";
import AccountClient from "./AccountClient";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;

  const user = userCookie ? JSON.parse(userCookie) : null;

  return <AccountClient user={user} />;
}
