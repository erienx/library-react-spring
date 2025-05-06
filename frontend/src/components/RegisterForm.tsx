import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import EmailIcon from "../assets/email-icon.svg?react";
import PasswordIcon from "../assets/password-icon.svg?react";
import ProfileIcon from "../assets/profile-icon.svg?react"
import FormError from "../components/ui/FormError";
import ButtonSubmit from "../components/ui/ButtonSubmit";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";
import addMember from "../hooks/api/addMember";
import { useAuth } from "./providers/AuthContext";


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

type FormFields = z.infer<typeof schema>;

export const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });
    const firstNameValue = watch("firstName");
    const lastNameValue = watch("lastName");
    const emailValue = watch("email");
    const passwordValue = watch("password");
    const confirmPasswordValue = watch("confirmPassword");

    const navigate = useNavigate();

    const { handleLogin } = useAuth();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await addMember(data);
            await handleLogin(data.email, data.password);

            reset();
            navigate("/");
        } catch (err) {
            if (err instanceof Error) {
                setError("root", {
                    message: err.message,
                });
            } else {
                setError("root", {
                    message: "An unexpected error occurred",
                });
            }
        }
    };

    return (
        <form
            className="flex flex-col gap-y-3 rounded-2xl min-w-[200px] xs:min-w-[400px] text-blue"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormInput
                Icon={ProfileIcon}
                type="text"
                placeholder="First Name"
                value={firstNameValue}
                register={register("firstName")}
                error={errors.firstName}
            />
            <FormInput
                Icon={ProfileIcon}
                type="text"
                placeholder="Last Name"
                value={lastNameValue}
                register={register("lastName")}
                error={errors.lastName}
            />
            <FormInput
                Icon={EmailIcon}
                type="text"
                placeholder="Email"
                value={emailValue}
                register={register("email")}
                error={errors.email}
            />
            <FormInput
                Icon={PasswordIcon}
                type="password"
                placeholder="Password"
                value={passwordValue}
                register={register("password")}
                error={errors.password}
            />
            <FormInput
                Icon={PasswordIcon}
                type="password"
                placeholder="Confirm Password"
                value={confirmPasswordValue}
                register={register("confirmPassword")}
                error={errors.confirmPassword}
            />

            <ButtonSubmit isSubmitting={isSubmitting} btnText="Register" />
            <FormError error={errors.root} />
        </form>
    );
};

export default RegisterForm;
