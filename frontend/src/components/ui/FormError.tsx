import { useTranslation } from "react-i18next";

type FormType = {
    error?: { message?: string };
};

const FormError = ({ error }: FormType) => {
    const { t } = useTranslation();
    return (
        error && <div className="text-red-400 text-md mt-1" >{t(error.message ?? "")}</div>
    )
}

export default FormError