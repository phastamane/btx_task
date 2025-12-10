import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await res.json();



   const cookieStore = await cookies();
   cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });


        
    return new Response(JSON.stringify(data), {
      status: res.ok ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("SERVER LOGIN ERROR:", e);

    return new Response(JSON.stringify({ error: "Server crash", e }), {
      status: 500,
    });
  }

}
