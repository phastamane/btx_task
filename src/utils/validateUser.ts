import { userSchema } from "@/schemas/user.schema";
import type { UserFormInput, UserValidatedData } from "@/schemas/user.schema";

export function validateUser(form: UserFormInput): {
  data?: UserValidatedData;
  errors?: Record<string, string>;
} {
  const result = userSchema.safeParse(form);

  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (typeof field === "string") {
        errors[field] = issue.message;
      }
    });

    return { errors };
  }

  return { data: result.data };
}
