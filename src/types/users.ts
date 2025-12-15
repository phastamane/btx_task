import { UserRole } from "@/shared/constants/roles.constants";

export interface UserInterface {
  id: number;
  firstName: string;
  maidenName:string;
  lastName: string;
  username: string,
  birthDate: string;
  age: number;
  gender: string;
  email: string;
  image: string;
  role: UserRole;
}

export type UserTableType = Map<number,  UserInterface>
