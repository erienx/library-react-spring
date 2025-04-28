import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import FormError from "./ui/FormError";
import useInputState from "../hooks/useInputState";
import { useState } from "react";
import PasswordToggle from "./ui/PasswordToggle";

type FormInputProps = {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  value?: string;
  error?: FieldError;
  showToggle?: boolean;
}



const FormInput = ({ Icon, type, placeholder, register, value, error, showToggle = false }: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const state = useInputState(value, error);

  return (
    <>
      <div className="relative group">
        <Icon
          className={clsx(
            "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-150",
            {
              "text-slate-300": state.color === "empty",
              "text-slate-100": state.color === "empty-focus",
              "text-accent1-hover": state.color === "filled",
              "text-accent1": state.color === "filled-focus",
              "text-red-300": state.color === "error",
              "text-red-500": state.color === "error-focus",
            }
          )}
        />
        <input
          {...register}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          onFocus={state.onFocus}
          onBlur={state.onBlur}
          onChange={(e) => {
            register.onChange(e);
            state.onChange(e);
          }}
          className={clsx(
            "pl-10 pr-4 py-2 border rounded-md w-full outline-none transition-colors duration-150",
            showToggle ? "pr-10" : "pr-4",
            {
              "border-slate-300": state.color === "empty",
              "border-slate-100": state.color === "empty-focus",
              "border-accent1-hover": state.color === "filled",
              "border-accent1": state.color === "filled-focus",
              "border-red-300": state.color === "error",
              "border-red-500": state.color === "error-focus",
            }
          )}
        />
        {isPassword && showToggle && (
          <PasswordToggle show={showPassword} toggle={() => setShowPassword((prev) => !prev)} />
        )}
      </div>
      <FormError error={error} />
    </>
  );
};


export default FormInput;
