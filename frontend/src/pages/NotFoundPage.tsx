import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const NotFoundPage = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-3 justify-center items-center m-4">
            <p className="text-4xl">{t('404')}</p>
            <Link className="text-4xl border-1 p-5 rounded-2xl font-semibold" to="/">{t('linkHome')}</Link>
        </div>
    )
}

export default NotFoundPage