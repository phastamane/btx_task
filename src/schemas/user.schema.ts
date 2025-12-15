import { z } from "zod";

// тип формы, age: string
export const userFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  age: z.string(),
  gender: z.string(),
  role: z.string(),
});

export type UserFormInput = z.infer<typeof userFormSchema>; 
// age: string

// валидированная схема (transform -> number)
export const userSchema = z.object({
  firstName: z.string().min(1, "Введите имя"),
  lastName: z.string().min(1, "Введите фамилию"),
  email: z.string().email("Некорректный email"),
  age: z
    .string()
    .min(1, "Укажите возраст")
    .refine((v) => !Number.isNaN(Number(v)), "Возраст должен быть числом")
    .transform((v) => Number(v))
    .refine((v) => v > 0, "Возраст должен быть положительным"),
  gender: z.string().min(1, "Выберите пол"),
  role: z.string().min(1, "Выберите роль"),
});

export type UserValidatedData = z.infer<typeof userSchema>;
// age: number
