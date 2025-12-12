"use client";

import React from "react";
import { Form, Input, Button } from "@heroui/react";
import axios from "axios";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons/Icons";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user.store";

const TEXTS = {
  USERNAME_LABEL: "Имя пользователя",
  USERNAME_PLACEHOLDER: "admin@example.com",
  PASSWORD_LABEL: "Пароль",
  PASSWORD_PLACEHOLDER: "Введите пароль",
  SUBMIT_BUTTON: "Войти",
};

export default function AuthForm() {
  const [error, setError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>(
    {}
  );
  const [isVisible, setIsVisible] = React.useState(false);
  const setUser = useUserStore((s) => s.setUser);
  const user = useUserStore((s) => s.user)
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  React.useEffect(() => {
  console.log("USER UPDATED", user);
}, [user]);

  return (
    <Form
      className="w-full flex flex-col gap-8 items-center"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);
        const username = (formData.get("username") ?? "").toString().trim();
        const password = (formData.get("password") ?? "").toString().trim();

        const errors: Record<string, string> = {};
        if (!username) errors.username = "Введите логин";
        if (!password) errors.password = "Введите пароль";

        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors);
          return;
        }

        setFieldErrors({});

        try {
          const res = await axios.post("/api/auth/login", { username, password });
          setUser(res.data.user);
          router.push("/posts");
          console.log("SERVER RESPONSE:", res.data);


        } catch (err) {
          setError("Неверные данные или сервер недоступен");
        }
      }}
    >
      <Input
        label={TEXTS.USERNAME_LABEL}
        labelPlacement="outside"
        name="username"
        placeholder={TEXTS.USERNAME_PLACEHOLDER}
        type="text"
        isInvalid={!!fieldErrors.username}
        errorMessage={fieldErrors.username}
        classNames={{
          inputWrapper: "bg-white border-2 border-gray-300 text-base",
          input: "text-base text-gray-200",
          label: '!text-gray-500',
        }}
      />

      <Input
        endContent={
          <button
            aria-label="toggle password visibility"
            className="focus:outline-solid outline-transparent"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        name="password"
        label={TEXTS.PASSWORD_LABEL}
        labelPlacement="outside"
        placeholder={TEXTS.PASSWORD_PLACEHOLDER}
        type={isVisible ? "text" : "password"}
        variant="bordered"
        isInvalid={!!fieldErrors.password}
        errorMessage={fieldErrors.password}
        classNames={{
          inputWrapper: "bg-white border-2 border-gray-300 text-base",
          input: "text-base",
          label: '!text-gray-500',
        }}
      />

      <div className="flex gap-2 w-full">
        <Button color="primary" className="w-full text-base" type="submit">
          {TEXTS.SUBMIT_BUTTON}
        </Button>
      </div>

      {error && (
        <div className="text-small text-default-500">
         <p>{error}</p>
        </div>
      )}
    </Form>
  );
}
