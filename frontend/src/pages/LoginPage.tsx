import { Link, useNavigate } from "react-router-dom"
import { LoginForm } from "../components/LoginForm"
import AuthHeader from "../components/ui/AuthHeader"
import { useEffect } from "react";
import { useAuth } from "../components/providers/AuthContext";
import { useTranslation } from "react-i18next";



const LoginPage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (currentUser) navigate('/');
    }, [currentUser, navigate]);

    return (
        <>
            <AuthHeader text1={`${t('welcomeTo')} ${t('title')}`} text2={t('signPrompt')} />
            <LoginForm />
            <p className="text-dark mt-4 font-light">{t('noAccountQuestion')}
                <Link to='/register' className="text-accent2 hover:text-accent2-hover font-semibold "> {t('register')}</Link></p>
        </>
    )
}

export default LoginPage