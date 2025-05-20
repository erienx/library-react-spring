import { useTranslation } from "react-i18next";
import AddBookForm from "../../components/AddBookForm";

const AddBookPage = () => {
    const {t} = useTranslation();
    return (
        <div className="min-h-[calc(100vh-64px)] w-full flex items-start justify-center bg-bg px-4 py-10 sm:px-6">
            <div className="w-full max-w-xl bg-bg-darker rounded-2xl shadow-lg p-6 sm:p-10 border border-bg-lighter">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                    {t('addNewBook')}
                </h1>
                <AddBookForm />
            </div>
        </div>
    );
};

export default AddBookPage;
