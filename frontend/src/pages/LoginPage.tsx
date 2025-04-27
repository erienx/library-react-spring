import { Link, useNavigate } from "react-router-dom"
import { LoginForm } from "../components/LoginForm"
import AuthHeader from "../components/ui/AuthHeader"
import { useEffect } from "react";
import { useAuth } from "../components/providers/AuthProvider";



const LoginPage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) navigate('/');
    }, [currentUser]);

    return (
        <>
            <AuthHeader text1="Welcome to E-com" text2="Sign in to continue" />
            <LoginForm />
            <p className="text-dark mt-4 font-light">Don't have an account?
                <Link to='/register' className="text-accent2 hover:text-accent2-hover font-semibold "> Register</Link></p>
        </>
    )
}

export default LoginPage