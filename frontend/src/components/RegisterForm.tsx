import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormError from "../components/ui/FormError";
import ButtonSubmit from "../components/ui/ButtonSubmit";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";
import addMember from "../hooks/api/addMember";
import { useAuth } from "./providers/AuthContext";
import useFormDefinition from "../hooks/api/useFormDefinition";
import { iconMap } from "../util/iconMap";
import { useTranslation } from "react-i18next";



export const RegisterForm = () => {
    const navigate = useNavigate();
    const { fields, loading, schema } = useFormDefinition("register");
    const { t } = useTranslation();

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
                        placeholder={t(field.name)}
                        value={val}
                        register={register(field.name)}
                        error={errors[field.name]}
                        Icon={Icon}
                        showToggle={field.type === "password"}
                    />
                );
            })}

            <ButtonSubmit isSubmitting={isSubmitting} btnText={t('register')} />
            <FormError error={errors.root} />
        </form>
    );
};


export default RegisterForm;
