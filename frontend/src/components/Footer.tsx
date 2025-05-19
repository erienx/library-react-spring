import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className="mt-10 bg-bg-lighter text-white text-sm rounded-t-2xl shadow-inner px-6 py-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                    <h3 className="font-semibold text-accent1 mb-2 text-2xl">{t('title')}</h3>
                    <p className="text-md">
                        {t('footer1_desc')}
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-accent1 mb-2 text-2xl">{t('resources')}</h3>
                    <ul className="space-y-1 text-slate-300">
                        <li><span className="font-semibold text-md">{t('phone')}:</span> +48 123-456-789</li>
                        <li><span className="font-semibold text-md">Email:</span> info@yourlibrary.com</li>
                        <li><span className="font-semibold text-md">{t('open')}: </span>{t('openTimes')}</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-accent1 mb-2 text-2xl">{t('connect')}</h3>
                    <ul className="space-y-1 text-slate-300">
                        <li>
                            <a href="https://github.com/yourrepo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a href="mailto:support@yourlibrary.com" className="hover:text-white transition-colors">
                                {t('emailSupport')}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 text-center text-slate-400 text-xs">
                © {new Date().getFullYear()} {t('trademarkText')}
            </div>
        </footer>
    );
};




export default Footer