import { api } from "./api"
import { UserInterface } from "@/types/users"

const url = 'https://dummyjson.com/users?limit=0'
export const UsersService = {
    getAll(){
        return api.get(url)
    }
}

export async function createUser(userData: any) {
  const res = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) throw new Error("Failed to create user");

  return res.json();
}

export async function updateUser(id: number, data: Partial<UserInterface>) {
  const res = await fetch(`https://dummyjson.com/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteUser(id: number) {
  // DummyJSON не умеет удалять → имитируем
  return { success: true, id };
}