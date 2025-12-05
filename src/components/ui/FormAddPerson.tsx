import React from "react";
import { Form as HeroUIForm, Input, Button } from "@heroui/react";
import { DateInput } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";
import { ADMINS_CONST } from "@/shared/constants/admins.constants";

export default function FormAddPerson({onPress}:{onPress?: () => void}) {
  const [errors, setErrors] = React.useState({});

  const onSubmit = (e:any) => {
      
  e.preventDefault();      
  onPress?.();               
};


  return (
   
      <HeroUIForm
        className="w-full max-w-xs flex flex-col gap-8 items-center"
        validationErrors={errors}
        onSubmit={onSubmit}
      >
        <Input
          label="ФИО"
          labelPlacement="outside"
          name="username"
          placeholder="Введите ФИО"
        />
        <Input
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Введите email"
          type="email"
        />
        <DateInput
          className="max-w-sm"
          labelPlacement="outside"
          label={"Дата рождения"}
          placeholderValue={new CalendarDate(1995, 11, 6)}
        />
        <Button type="submit" color='primary' className="w-full">
          {ADMINS_CONST.modalButton}
        </Button>
      </HeroUIForm>
  
  );
}
