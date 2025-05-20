import { useNavigate } from "react-router-dom"
import CartIcon from "../../assets/cart-icon.svg?react"
import OrderIcon from "../../assets/orders-icon.svg?react"
import { useAuth } from "../providers/AuthContext";
import { useHasAccess } from "../../hooks/useHasAccess";
import AdminSelect from "../ui/AdminSelect";
import UpperHeaderLink from "../ui/UpperHeaderLink";
import LanguageOptions from "../ui/LanguageOptions";
import { useTranslation } from "react-i18next";

const UpperHeader = () => {
    const { t } = useTranslation();
    const { currentUser, handleLogout } = useAuth();
    const isAdmin = useHasAccess(['admin']);
    const navigate = useNavigate();

    const logoutAndRedirect = async () => {
        await handleLogout();
        navigate('/');
    };


    return (
        <header className="w-full bg-bg px-4 sm:px-10 py-4 border-b border-bg-lighter shadow-sm">
            <div className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">

                <div className="text-white text-sm sm:text-2xl min-h-[28px]">
                    {currentUser && (
                        <>{t('welcome')}, <span className="font-semibold">{currentUser.firstName} {currentUser.lastName}</span></>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-center sm:justify-end">
                    {isAdmin && <AdminSelect />}

                    {!currentUser && (
                        <>
                            <UpperHeaderLink to="register" text={t('register')} />
                            <UpperHeaderLink to="login" text={t('login')} />
                        </>
                    )}
                    {currentUser && <UpperHeaderLink to="orders" text={t('orders')} Icon={OrderIcon} />}

                    {currentUser && <UpperHeaderLink to="cart" text={t('cart')} Icon={CartIcon} />}

                    {currentUser && <button
                        onClick={logoutAndRedirect}
                        className="px-4 py-2 bg-bg-lighter text-white text-sm font-medium rounded-md shadow-md hover:bg-bg hover:text-accent1 transition cursor-pointer">
                        {t('signout')}
                    </button>}
                    <LanguageOptions />
                </div>
            </div>
        </header >

    );
};


export default UpperHeader