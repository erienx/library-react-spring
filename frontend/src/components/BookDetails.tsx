import { Book } from "../types/types";
import useFetchBooksByCategoryApi from "../hooks/api/useFetchBooksByCategoryApi";
import DisplayBookCards from "./DisplayBookCards";
import DummyLoadingCards from "./ui/DummyLoadingCards";
import Spinner from "../components/ui/Spinner";
import BookCover from "./ui/BookCover";
import BookInfoSection from "./ui/BookInfoSection";

type BookDetailsProps = {
  book: Book;
};

const BookDetails = ({ book }: BookDetailsProps) => {
  const { books: similarBooks, errorMsg: similarError, isLoading: isSimilarLoading } = useFetchBooksByCategoryApi(book.category.categoryID, 9);
  const isPopular = book.rentedCount > 100;


  return (
    <div className="flex flex-col gap-20 p-10 max-w-7xl mx-auto">

      <div className="flex flex-col lg:flex-row gap-10 p-8 bg-gradient-to-t from-bg to-bg-lighter shadow-lg shadow-black/25 rounded-2xl hover:shadow-black/50 transition-all duration-500">

        <BookCover book={book} isPopular={isPopular} />
        <BookInfoSection book={book} />

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
