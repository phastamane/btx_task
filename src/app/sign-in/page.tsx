import React from "react";
import AuthForm from "@/components/ui/Form";
function AuthPage() {
  return (
    <div className="grid place-items-center min-h-screen bg-blue-100 max-sm:place-items-stretch max-sm:min-h-auto">
          <div className="sm:hidden bg-white p-5 rounded-xl w-full mb-5 "><img className="max-w-[100px] mx-auto" src="/BTX.svg" alt="logo" /></div>
      
      <div className="bg-white rounded-3xl p-15 max-w-xl border border-gray-300 max-sm:max-w-full max-sm:p-5 max-sm:border-none max-sm:rounded-b-none">
       
        <div className="flex flex-col items-center gap-8 max-sm:gap-2">
          <img className="max-sm:hidden max-w-[100px] mx-auto" src="/BTX.svg" alt="logo" />
          <h1 className="text-4xl font-semibold max-sm:text-xl">Панель администратора</h1>
          <p className="text-xl max-sm:text-base max-sm:mb-5">Войдите в систему для продолжения</p>
        
        <AuthForm />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
