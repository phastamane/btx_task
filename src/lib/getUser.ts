import { cookies } from "next/headers";

export default async function getUser(){

    const cookieStore = await cookies()
    const user =  cookieStore.get("user")?.value;
        
     if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}