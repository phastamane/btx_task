export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  age: number;
  gender: string;
  email: string;
  image: string;
  role: string;
}

export type UserTableType = Map<number,  UserInterface>
