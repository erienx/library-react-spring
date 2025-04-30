import { Book } from "../types/types"
import FullStarIcon from "../assets/stars/star-full-icon.svg?react";
import { Link } from "react-router-dom";

type BookCardProps = {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Link to={`/book/${book.bookID}`} className="bg-gradient-to-t from-bg to-bg-lighter p-5 rounded-2xl shadow-lg shadow-black/25 flex flex-col
        hover:scale-102 transition-all duration-400 hover:shadow-black/40 hover:from-bg hover:to-bg-lighter2">
      <img
        className="rounded-lg h-auto w-auto max-h-[300px] min-h-[300px] overflow-hidden"
        src={book.pathToCover ? book.pathToCover : '/no-img.png'}
        alt={`poster of ${book.title}`}
      />

      <div className='mt-5 gap-y-2 flex flex-col flex-grow'>
        <h3 className='text-white font-bold text-xl'>{book.title}</h3>
        <p className="text-md font-light mb-3">{book.author.authorName}</p>

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
    </Link>
  );
}

export default BookCard