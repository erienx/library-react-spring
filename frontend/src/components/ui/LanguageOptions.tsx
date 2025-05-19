import { useTranslation } from "react-i18next";

const LanguageOptions = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: 'en' | 'pl') => {
        i18n.changeLanguage(lng);
    };
    return (
        <div className="flex flex-row items-center justify-center gap-x-2">
            <p className="text-sm text-slate-200 cursor-pointer" onClick={() => changeLanguage('en')}>EN</p>
            <p className="text-sm text-slate-200 cursor-pointer" onClick={() => changeLanguage('pl')}>PL</p>
        </div>
    )
}

export default LanguageOptions