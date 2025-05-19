import { Link } from "react-router-dom"
import LogoIcon from '../../assets/logo-icon.svg?react';
import { useTranslation } from "react-i18next";
const HomeButton = () => {
    const { t } = useTranslation();
    return (
        <Link to='/' className="flex gap-3 items-center mr-12">
            <LogoIcon />
            <h4 className="font-bold text-txt text-2xl">{t('title')}</h4>
        </Link>
    )
}

export default HomeButton