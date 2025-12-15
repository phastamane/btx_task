import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  defaultValue?: string | number;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  register,
  error,
  defaultValue,
  inputProps,
}) => {
  return (
    <div className="account-page__field">
      <label className="account-page__label">{label}</label>

      <input
        type={type}
        defaultValue={defaultValue}
        {...register(name)}
        {...inputProps}
        className="account-page__input"
      />

      {error && (
        <p className="account-page__error">{error.message}</p>
      )}
    </div>
  );
};

export default InputField;
