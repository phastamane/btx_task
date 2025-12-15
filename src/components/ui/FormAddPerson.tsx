"use client";

import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { validateUser } from "@/utils/validateUser";
import type { UserFormInput } from "@/schemas/user.schema";
import { createUser } from "@/services/users.servise";
import { useLocalUsersStore } from "@/store/localUsers.store";
import { role } from "@/shared/constants/role.constants";

export default function FormAddPerson({
  onPress,
  context,
}: {
  onPress: () => void;
  context: string;
}) {
  const addLocalUser = useLocalUsersStore((s) => s.addLocalUser);

  const [form, setForm] = useState<UserFormInput>({
    firstName: "",
    lastName: "",
    email: "",
    age: "0",
    gender: "",
    role: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const roleOptions = role(context)

  const genderOptions = [
    { key: "male", label: "Мужской" },
    { key: "female", label: "Женский" },
  ];

 const handleSubmit = async () => {
  const { data, errors } = validateUser(form);

  if (errors) {
    setErrors(errors);
    return;
  }

  setErrors({});

  // data.age уже number, transform сработал
  const newUser = await createUser(data);

  addLocalUser(newUser);
  onPress();
};


  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">

      <Input
        label="Имя"
        isInvalid={!!errors.firstName}
        errorMessage={errors.firstName}
        value={form.firstName}
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
      />

      <Input
        label="Фамилия"
        isInvalid={!!errors.lastName}
        errorMessage={errors.lastName}
        value={form.lastName}
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
      />

      <Input
        label="Email"
        isInvalid={!!errors.email}
        errorMessage={errors.email}
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <Input
        label="Возраст"
        type="number"
        isInvalid={!!errors.age}
        errorMessage={errors.age}
        value={form.age}
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

      <Button color="primary" onPress={handleSubmit}>
        Добавить пользователя
      </Button>
    </div>
  );
}
