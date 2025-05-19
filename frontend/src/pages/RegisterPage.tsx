import { Link, useNavigate } from "react-router-dom"
import AuthHeader from "../components/ui/AuthHeader"
import RegisterForm from "../components/RegisterForm"
import { useAuth } from "../components/providers/AuthContext";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

  return (
    <>
      <AuthHeader text1={t('getStarted')} text2={t('createAcc')} />
      <RegisterForm />
      <p className="text-dark mt-4 font-light">{t('hasAccountQuestion')}
        <Link to='/login' className="text-accent2 hover:text-accent2-hover font-semibold"> {t('login')}</Link></p>
    </>
  )
}

export default RegisterPage 