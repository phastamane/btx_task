import { error } from "console";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken");

    if (!refreshToken) {
      return Response.json(
        { success: false, error: "No refresh token" },
        { status: 401 }
      );
    }

    const res = await fetch("https://dummyjson.com/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken: refreshToken, // Optional, if not provided, the server will use the cookie
        expiresInMins: 30, // optional (FOR ACCESS TOKEN), defaults to 60
      }),
      credentials: "include", // Include cookies (e.g., accessToken) in the request
    });

    if (!res) {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      cookieStore.delete("user");

      return Response.json(
        { success: false, error: "Invalid refresh token" },
        { status: 401 }
      );
    }

    const data = await res.json();

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
    if (data.id) {

      const fullUser = await fetch(
        `https://dummyjson.com/users/${data.id}`
      ).then((r) => r.json());

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
        password: fullUser.password,
      };
      cookieStore.set("user", JSON.stringify(user), {
      httpOnly: false,
      path: "/",
    });
    }


    return Response.json({ success: true });
  } catch(e){
    console.error('REFRESH_ERROR', e)
    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
