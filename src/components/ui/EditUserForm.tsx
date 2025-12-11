"use client";

import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { validateUser } from "@/utils/validateUser";
import type { UserFormInput } from "@/schemas/user.schema";

export default function EditUserForm({
  initialUser,
  onSubmit,
}: {
  initialUser: any;
  onSubmit: (data: any) => void;
}) {
  const [form, setForm] = useState<UserFormInput>({
    firstName: initialUser.firstName,
    lastName: initialUser.lastName,
    email: initialUser.email,
    age: String(initialUser.age),
    gender: initialUser.gender,
    role: initialUser.role,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const roleOptions = [
    { key: "admin", label: "Администратор" },
    { key: "moderator", label: "Модератор" },
    { key: "user", label: "Автор" },
  ];

  const genderOptions = [
    { key: "male", label: "Мужской" },
    { key: "female", label: "Женский" },
  ];

  const handleSave = () => {
    const { data, errors } = validateUser(form);

    if (errors) {
      setErrors(errors);
      return;
    }

    onSubmit(data); // data.age уже number
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <Input
        label="Имя"
        value={form.firstName}
        isInvalid={!!errors.firstName}
        errorMessage={errors.firstName}
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
      />

      <Input
        label="Фамилия"
        value={form.lastName}
        isInvalid={!!errors.lastName}
        errorMessage={errors.lastName}
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
      />

      <Input
        label="Email"
        value={form.email}
        isInvalid={!!errors.email}
        errorMessage={errors.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <Input
        label="Возраст"
        type="number"
        value={form.age}
        isInvalid={!!errors.age}
        errorMessage={errors.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />

      <Select
        label="Пол"
        selectedKeys={[form.gender]}
        isInvalid={!!errors.gender}
        errorMessage={errors.gender}
        onSelectionChange={(keys) =>
          setForm({ ...form, gender: String(Array.from(keys)[0]) })
        }
      >
        {genderOptions.map((g) => (
          <SelectItem key={g.key}>{g.label}</SelectItem>
        ))}
      </Select>

      <Select
        label="Роль"
        selectedKeys={[form.role]}
        isInvalid={!!errors.role}
        errorMessage={errors.role}
        onSelectionChange={(keys) =>
          setForm({ ...form, role: String(Array.from(keys)[0]) })
        }
      >
        {roleOptions.map((r) => (
          <SelectItem key={r.key}>{r.label}</SelectItem>
        ))}
      </Select>

      <Button color="primary" onPress={handleSave}>
        Сохранить изменения
      </Button>
    </div>
  );
}
