import { Link } from "react-router-dom";
import { Book } from "../types/types";
import Rating from "./ui/Rating";
import FullStarIcon from "../assets/stars/star-full-icon.svg?react"
import useFetchBooksByCategoryApi from "../hooks/api/useFetchBooksByCategoryApi";
import DisplayBookCards from "./DisplayBookCards";
import DummyLoadingCards from "./ui/DummyLoadingCards";
import Spinner from "../components/ui/Spinner";

type BookDetailsProps = {
  book: Book;
};

const BookDetails = ({ book }: BookDetailsProps) => {
  const { books: similarBooks, errorMsg: similarError, isLoading: isSimilarLoading } = useFetchBooksByCategoryApi(book.category.categoryID, 9);
  const isPopular = book.rentedCount > 100;


  return (
    <div className="flex flex-col gap-20 p-10 max-w-7xl mx-auto">

      <div className="flex flex-col lg:flex-row gap-10 p-8 bg-gradient-to-t from-bg to-bg-lighter shadow-lg shadow-black/25 rounded-2xl">

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



        {/* info section */}
        <section className="flex flex-col flex-grow gap-6">
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
        </section>
      </div>


      <div className="flex flex-col gap-6 ">
        <h2 className="text-4xl font-light text-white">More from <span className="font-bold text-gradient-header">{book.category.categoryName}</span> category</h2>

        {isSimilarLoading ? (
          <>
            <DummyLoadingCards />
            <Spinner />
          </>
        ) : similarError ? (
          <p className="text-red-400">{similarError}</p>
        ) : similarBooks.length === 0 ? (
          <p className="text-gray-300 text-3xl mt-8">No books found :(</p>
        ) : (
          <DisplayBookCards books={similarBooks.filter((b) => b.bookID != book.bookID)} />
        )}
      </div>
    </div>



  );
};

export default BookDetails;
