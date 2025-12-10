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
    };

    const cookieStore = await cookies();

    // HTTP ONLY TOKEN
    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: false,
      path: "/",
    });

    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
    });

    // Клиентский cookie с данными пользователя
    cookieStore.set("user", JSON.stringify(user), {
      httpOnly: false,
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
