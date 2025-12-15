"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
} from "@heroui/react";
import { useState } from "react";
import { z } from "zod";
import { useUserStore } from "@/store/user.store";

const passwordSchema = z
  .object({
    oldPass: z.string().min(1, "Введите старый пароль"),
    newPass: z.string().min(6, "Минимум 6 символов"),
    repeatPass: z.string().min(6, "Минимум 6 символов"),
  })
  .refine((data) => data.newPass === data.repeatPass, {
    path: ["repeatPass"],
    message: "Пароли не совпадают",
  });

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  const [form, setForm] = useState({
    oldPass: "",
    newPass: "",
    repeatPass: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    if (!user) return;

    const validation = passwordSchema.safeParse(form);

    if (!validation.success) {
      const err: Record<string, string> = {};
      validation.error.issues.forEach((i) => {
        const key = String(i.path[0]);
        err[key] = i.message;
      });
      setErrors(err);
      return;
    }

    setErrors({});

    // Здесь должен быть запрос на сервер для смены пароля.
    // Пока просто закрываем модалку после валидации.
    setUser(user);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <ModalContent>
        <ModalHeader className="text-xl font-semibold">
          Изменить пароль
        </ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          {success && (
            <Card className="bg-green-50 border border-green-200 shadow-none">
              <CardHeader className="pb-0">
                <p className="text-sm text-green-600 font-semibold">
                  Пароль изменен
                </p>
              </CardHeader>
              <CardBody className="pt-1 text-green-700">
                Новый пароль успешно сохранен
              </CardBody>
            </Card>
          )}

          <Input
            type="password"
            label="Старый пароль"
            isInvalid={!!errors.oldPass}
            errorMessage={errors.oldPass}
            value={form.oldPass}
            onChange={(e) => setForm({ ...form, oldPass: e.target.value })}
          />

          <Input
            type="password"
            label="Новый пароль"
            isInvalid={!!errors.newPass}
            errorMessage={errors.newPass}
            value={form.newPass}
            onChange={(e) => setForm({ ...form, newPass: e.target.value })}
          />

          <Input
            type="password"
            label="Повторите пароль"
            isInvalid={!!errors.repeatPass}
            errorMessage={errors.repeatPass}
            value={form.repeatPass}
            onChange={(e) =>
              setForm({ ...form, repeatPass: e.target.value })
            }
          />

          <Button color="primary" onPress={handleSave}>
            Сохранить
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
