"use client";

import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <section className="min-h-full flex items-center justify-center bg-blue-100 px-6">
      <div className="max-w-md text-center">
        {/* Иконка */}
        <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-neutral-900 flex items-center justify-center border border-neutral-800 shadow-[0_0_30px_rgba(255,127,80,0.15)]">
          <span className="text-4xl">🔒</span>
        </div>

        {/* Заголовок */}
        <h1 className="text-3xl font-semibold mb-4">
          Доступ ограничён
        </h1>

        {/* Текст */}
        <p className="text-neutral-700 leading-relaxed mb-8">
          Извини, но эта страница недоступна для тебя.  
          Возможно, у тебя недостаточно прав, или она предназначена только для администрации.  
          Но всё в порядке — ты можешь вернуться назад и продолжить работу.
        </p>

        {/* Кнопки */}
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium transition"
          >
            На главную
          </Link>
        </div>

        {/* Подвал */}
        <p className="text-neutral-600 mt-10 text-sm">
          Если считаешь, что это ошибка — свяжись с администратором.
        </p>
      </div>
    </section>
  );
}
