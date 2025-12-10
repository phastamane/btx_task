import React from "react";
import AuthForm from "@/components/ui/Form";
function AuthPage() {
  return (
    <div className="grid place-items-center min-h-screen bg-blue-100">
      <div className="bg-white rounded-3xl p-15 max-w-xl border border-gray-300">
        <div className="flex flex-col items-center gap-8">
          <img className="max-w-[100px]" src="/BTX.svg" alt="logo" />
          <h1 className="text-4xl font-semibold">Панель администратора</h1>
          <p className="text-xl">Войдите в систему для продолжения</p>
        
        <AuthForm />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
