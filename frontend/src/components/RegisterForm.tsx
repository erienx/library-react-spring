import {  useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormError from "../components/ui/FormError";
import ButtonSubmit from "../components/ui/ButtonSubmit";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";
import addMember from "../hooks/api/addMember";
import { useAuth } from "./providers/AuthContext";
import useFormDefinition from "../hooks/api/useFormDefinition";
import { iconMap } from "../util/iconMap";


const schema = z
    .object({
        firstName: z.string().min(1, { message: "First name is required" }),
        lastName: z.string().min(1, { message: "Last name is required" }),
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(8, { message: "Password must have at least 8 characters" }),
        confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });


export const RegisterForm = () => {
  const navigate = useNavigate();
  const { fields, loading, schema } = useFormDefinition("register");

  const {
    register,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { handleLogin } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      await addMember(data);
      await handleLogin(data.email, data.password);
      reset();
      navigate("/");
    } catch (err) {
      setError("root", {
        message:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred",
      });
    }
  };

  if (loading) return <div>Loading form...</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-3 rounded-2xl min-w-[200px] xs:min-w-[400px] text-blue"
    >
      {fields.map((field) => {
        const val = watch(field.name);
        const Icon = iconMap[field.icon] || (() => null);

        return (
          <FormInput
            key={field.name}
            type={field.type}
            placeholder={field.label}
            value={val}
            register={register(field.name)}
            error={errors[field.name]}
            Icon={Icon}
            showToggle={field.type === "password"}
          />
        );
      })}

      <ButtonSubmit isSubmitting={isSubmitting} btnText="Register" />
      <FormError error={errors.root} />
    </form>
  );
};


export default RegisterForm;
