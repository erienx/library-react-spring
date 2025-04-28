import { Link } from "react-router-dom";
import { Book } from "../types/types";
import  Rating  from "./ui/Rating";
import FullStarIcon from "../assets/stars/star-full-icon.svg?react"

type BookDetailsProps = {
  book: Book;
};

const BookDetails = ({ book}: BookDetailsProps) => {
  const isPopular = book.rentedCount > 40;

  return (
    <div className="flex flex-col gap-16 p-10 max-w-7xl mx-auto">

      <div className="flex flex-col lg:flex-row gap-10 p-8 bg-gradient-to-t from-bg to-bg-lighter shadow-lg shadow-black/25 rounded-2xl">

        <div className="relative flex-shrink-0 w-full lg:w-1/3">
          {isPopular && (
            <div className="absolute -top-3 -left-3 bg-gradient-to-r from-accent2/90 to-accent2-hover/90 filter saturate-80 text-bg px-3 py-1 rounded-tr-xl rounded-bl-xl text-xs font-bold shadow-md flex flex-row gap-x-1 items-center">
              <FullStarIcon /> Popular Choice
            </div>
          )}
          <img src={book.pathToCover ? book.pathToCover : '/no-img.png'} alt={`cover of ${book.title}`}
            className="rounded-2xl shadow-2xl shadow-black/20 w-full h-auto object-cover"/>
        </div>


        {/* info div */}
        <div className="flex flex-col flex-grow gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{book.title}</h1>
            <Link to={`/author/${book.author.authorID}`} className="text-xl text-accent2 hover:underline">
              by {book.author.authorName}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Rating rating={book.rating} />
            <span className="text-slate-300 text-sm">({book.rentedCount} rentals)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-200">

            <div className="flex flex-col">
              <span className="font-semibold text-white">Publication Year:</span>
              <span>{book.publicationYear}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-white">Pages:</span>
              <span>{book.pages}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-white">Publisher:</span>
              <Link to={`/publisher/${book.publisher.publisherID}`} className="text-accent2 hover:underline">
                {book.publisher.publisherName}
              </Link>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-white">Category:</span>
              <span>{book.category.categoryName}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-white">Added to Library:</span>
              <span>{new Date(book.addedDate).toLocaleDateString()}</span>
            </div>

          </div>

          <div className="mt-auto flex gap-4">
            <Link to="/" className="px-18 py-3 bg-gradient-to-r from-accent1/80 to-accent1-hover/80 text-white font-semibold rounded-xl shadow-md hover:from-accent1/60 hover:to-accent1-hover/60 transition">
              Add to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
