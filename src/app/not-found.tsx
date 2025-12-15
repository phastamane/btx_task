"use client";

import Link from "next/link";

const TEXT = {
  title: "Страница не найдена",
  description: "Похоже, вы перешли по несуществующей ссылке.",
  tipsLabel: "Что можно сделать?",
  tips: [
    "Проверить правильность адреса",
    "Вернуться к панели администратора",
  ],
  primary: "На главную",
  secondary: "Войти снова",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#eaf3ff] flex items-center justify-center px-4">
      <div className="bg-white rounded-[26px] shadow-sm border border-[#e5e7eb] max-w-md w-full p-8 flex flex-col items-center gap-6">
        <img
          src="/BTX.svg"
          alt="BTX"
          className="h-8"
        />

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            {TEXT.title}
          </h1>
          <p className="text-sm text-gray-600">
            {TEXT.description}
          </p>
        </div>

        <div className="w-full space-y-3">
          <div className="text-xs text-gray-500">{TEXT.tipsLabel}</div>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {TEXT.tips.map((tip) => (
              <span key={tip}>• {tip}</span>
            ))}
          </div>
        </div>

        <Link
          href="/posts"
          className="w-full rounded-md bg-[#006fee] text-white py-3 text-center text-sm font-semibold hover:bg-[#0b5bcc] transition-colors"
        >
          {TEXT.primary}
        </Link>

        <Link href="/sign-in" className="text-sm text-blue-600 hover:underline">
          {TEXT.secondary}
        </Link>
      </div>
    </div>
  );
}
