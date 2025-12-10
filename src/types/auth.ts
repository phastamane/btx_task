import { UserRole } from "@/shared/constants/roles.constants";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  image: string;
  role: UserRole;
}
