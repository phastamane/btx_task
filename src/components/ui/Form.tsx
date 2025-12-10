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

        let data = Object.fromEntries(new FormData(e.currentTarget));

        try {
          const res = await axios.post("/api/auth/login", data);
          setUser(res.data.user);
          router.push("/posts");
          console.log("SERVER RESPONSE:", res.data);


        } catch (err) {
          setError("Неверные данные или сервер недоступен");
        }
      }}
    >
      <Input
        errorMessage="Введите корректное имя"
        label={TEXTS.USERNAME_LABEL}
        labelPlacement="outside"
        name="username"
        placeholder={TEXTS.USERNAME_PLACEHOLDER}
        type="text"
        classNames={{
          inputWrapper: "bg-white border border-gray-200 text-base",
          input: "text-base",
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
        classNames={{
          inputWrapper: "bg-white border border-gray-200 text-base",
          input: "text-base",
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
