import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  console.log('srabotalS')
  cookieStore.delete("accessToken");

  cookieStore.set("refreshToken", "", {
    httpOnly: true,
    secure: false,
    path: "/",
    expires: new Date(0),
  });

  cookieStore.set("user", "", {
    httpOnly: false,
    path: "/",
    expires: new Date(0),
  });

  return NextResponse.json({ success: true });
}
