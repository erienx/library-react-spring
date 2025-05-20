import clsx from "clsx";
import { useTranslation } from "react-i18next";

type PaginationButtonsProps = {
    currentPage: number;
    totalPages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    className?: string;
}

const PaginationButtons = ({ currentPage, totalPages, setCurrentPage, className }: PaginationButtonsProps) => {
    const handleNext = () => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages));
    const handlePrev = () => setCurrentPage((prev: number) => Math.max(prev - 1, 0));
    const { t } = useTranslation();


    return (

        <div className={`flex justify-center items-center gap-x-4 ${className}`} >
            <div className="w-[90px] text-right">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                    className={clsx(
                        "text-xl font-medium transition-colors",
                        currentPage === 0
                            ? "text-slate-500 cursor-not-allowed"
                            : "text-accent1 hover:underline cursor-pointer"
                    )}>
                    {t('prev')}
                </button>
            </div>

            <span className="text-sm text-white/90 font-medium text-center min-w-[70px]">
                {t('page')} {currentPage + 1} / {totalPages}
            </span>

            <div className="w-[70px] text-left">
                <button
                    onClick={handleNext}
                    disabled={currentPage >= totalPages - 1}
                    className={clsx(
                        "text-xl font-medium transition-colors",
                        currentPage >= totalPages - 1
                            ? "text-slate-500 cursor-not-allowed"
                            : "text-accent1 hover:underline cursor-pointer"
                    )}>
                    {t('next')}
                </button>
            </div>
        </div >
    )
}

export default PaginationButtons