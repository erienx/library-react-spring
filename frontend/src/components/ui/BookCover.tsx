import { Book } from "../../types/types";
import FullStarIcon from "../../assets/stars/star-full-icon.svg?react";

type BookCoverProps = {
    book: Book;
    isPopular: boolean;
};

const BookCover = ({ book, isPopular }: BookCoverProps) => {
    return (
        <div className="relative flex-shrink-0 w-full lg:w-1/3 min-h-[400px] md:min-h-[650px] flex items-center justify-center bg-bg-lighter rounded-2xl">
            {isPopular && (
                <div className="absolute -top-5 -left-5 bg-gradient-to-r from-accent2 to-accent2-hover filter saturate-80 text-bg px-3 py-1 rounded-tr-xl rounded-bl-xl text-xs font-bold shadow-md flex flex-row gap-x-1 items-center">
                    <FullStarIcon /> Popular Choice
                </div>
            )}

            <div className="overflow-hidden rounded-2xl w-full h-full flex items-center justify-center">
                <img
                    src={book.pathToCover ? book.pathToCover : '/no-img.png'}
                    alt={`cover of ${book.title}`}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default BookCover;
