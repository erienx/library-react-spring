import { Link } from "react-router-dom";
import { useCartActions } from "../hooks/useCartActions";
import { Book } from "../types/types";
import FullStarIcon from "../assets/stars/star-full-icon.svg?react";
import RemoveButton from "./ui/RemoveButton";


const BookCardLine = ({ book, onRemove }: { book: Book; onRemove?: () => void }) => {
    const { loadingCart, handleRemoveFromCart } = useCartActions(book);

    const handleRemoveClick = async () => {
        await handleRemoveFromCart();
        onRemove?.();
    };

    return (
        <Link to={`/book/${book.bookID}`}>
            <li className="bg-gradient-to-r from-bg to-bg-lighter  hover:from-bg-lighter2 rounded-xl p-4 flex flex-col sm:flex-row gap-6 items-center shadow-md">
                <img
                    src={book.pathToCover || "/no-img.png"}
                    alt={book.title}
                    className="w-[120px] h-[180px] object-cover rounded-lg"
                />

                <div className="flex flex-col gap-2 flex-1">
                    <h2 className="text-xl font-bold text-white">{book.title}</h2>
                    <p className="text-gray-300">by {book.author.authorName}</p>
                    <div className='flex flex-row items-center flex-wrap gap-1 mt-auto'>
                        <p className='text-gray-300'>
                            Rented <span className='text-white font-bold'>{book.rentedCount}</span> times
                        </p>

                        <span className='text-sm text-slate-200'>•</span>

                        <FullStarIcon className="text-accent2 saturate-85" />
                        <p className="text-white font-bold">{book.rating.toFixed(1)}</p>

                        <span className='text-sm text-slate-200'>•</span>
                        <p className='text-white font-bold'>{book.publicationYear}</p>
                    </div>
                </div>


                {onRemove && <RemoveButton onClick={handleRemoveClick} loading={loadingCart} />}
            </li>
        </Link>

    );
};

export default BookCardLine;