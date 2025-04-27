import { Link, useNavigate } from "react-router-dom"
import AuthHeader from "../components/ui/AuthHeader"
import RegisterForm from "../components/RegisterForm"
import { useAuth } from "../components/providers/AuthProvider";
import { useEffect } from "react";

const RegisterPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser]);

  return (
    <>
      <AuthHeader text1="Let's get started" text2="Create a new account" />
      <RegisterForm />
      <p className="text-dark mt-4 font-light">Already have an account?
        <Link to='/login' className="text-accent2 hover:text-accent2-hover font-semibold"> Login</Link></p>
    </>
  )
}

export default RegisterPage 