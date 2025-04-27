import { SubmitHandler, useForm } from "react-hook-form";
import EmailIcon from "../assets/email-icon.svg?react"
import PasswordIcon from "../assets/password-icon.svg?react"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormError from "../components/ui/FormError";
import ButtonSubmit from "../components/ui/ButtonSubmit";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";

const schema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, { message: "Password must have at least 8 characters" }),
});

type FormFields = z.infer<typeof schema>;
export const LoginForm = () => {
  const { register, handleSubmit, setError, watch, reset, formState: { errors, isSubmitting } } = useForm<FormFields>({
          defaultValues: {
              // email: "text@gmail.com",
          },
          resolver: zodResolver(schema),
      });
      const emailValue = watch("email");
      const passwordValue = watch("password");

      const navigate = useNavigate();
  
  
      const {handleLogin} = useAuth();
      const onSubmit: SubmitHandler<FormFields> = async (data) => {
          try {
              // request to backend here
              await handleLogin();
              console.log(data);
  
  
              reset(); //if successful
              navigate("/");
          }
          catch {
              setError("root", { message: "Given email is already taken", });
          }
      }
  
      return (
          <form className="flex flex-col gap-y-3 rounded-2xl min-w-[200px] xs:min-w-[400px] text-blue" onSubmit={handleSubmit(onSubmit)}>
  
              <FormInput
                  Icon={EmailIcon}
                  type="text"
                  placeholder="Email"
                  register={register("email")}
                  value={emailValue}
                  error={errors.email}
              />
              <FormInput
                  Icon={PasswordIcon}
                  type="password"
                  placeholder="Password"
                  register={register("password")}
                  value={passwordValue}
                  error={errors.password}
                  showToggle
              />
  
  
  
              <ButtonSubmit isSubmitting={isSubmitting} btnText="Log in"/>
              <FormError error={errors.root} />
          </form>
      )
}
