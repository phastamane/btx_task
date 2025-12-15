import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // LOGIN
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);
      return new Response(
        JSON.stringify({ error: errorBody?.message ?? "Login failed" }),
        { status: res.status || 400 }
      );
    }

    const data = await res.json();

    // Получаем полные данные о юзере
    const fullUser = await fetch(`https://dummyjson.com/users/${data.id}`).then(
      (r) => r.json()
    );

    const user = {
      id: fullUser.id,
      username: fullUser.username,
      email: fullUser.email,
      firstName: fullUser.firstName,
      lastName: fullUser.lastName,
      maidenName: fullUser.maidenName,
      age: fullUser.age,
      birthDate: fullUser.birthDate,
      image: fullUser.image,
      role: fullUser.role ?? "user",
      password: fullUser.password
    };

    const cookieStore = await cookies();

    // HTTP ONLY TOKEN
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

    // HttpOnly cookie с данными пользователя
    cookieStore.set("user", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return Response.json({
      success: true,
      user,
    });
  } catch (e) {
    console.error("SERVER LOGIN ERROR:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
