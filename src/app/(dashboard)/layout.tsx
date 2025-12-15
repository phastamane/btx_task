// app/(dashboard)/layout.tsx

import { ReactNode } from "react";
import { cookies } from "next/headers";
import DashboardClient from "./DashboardClient";

export default async function Layout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const raw = cookieStore.get("user")?.value;
  let user = null;

  if (raw) {
    try {
      user = JSON.parse(raw);
    } catch {}
  }

  return <DashboardClient user={user}>{children}</DashboardClient>;
}
