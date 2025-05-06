import { Book } from "../types/types";
import useFetchBooksByCategory from "../hooks/api/useFetchBooksByCategory";
import DisplayBookCards from "./DisplayBookCards";
import BookCover from "./ui/BookCover";
import BookInfoSection from "./ui/BookInfoSection";
import { HandleLoadingList } from "./HandleLoadingList";

type BookDetailsProps = {
  book: Book;
};

const BookDetails = ({ book }: BookDetailsProps) => {
  const { books: similarBooks, errorMsg: similarError, isLoading: isSimilarLoading } = useFetchBooksByCategory(book.category.categoryID, 9);
  const isPopular = book.rentedCount > 100;


  return (
    <div className="flex flex-col gap-20 p-10 max-w-7xl mx-auto">

      <div className="flex flex-col lg:flex-row gap-10 p-8 bg-gradient-to-t from-bg to-bg-lighter shadow-lg shadow-black/25 rounded-2xl hover:shadow-black/50 transition-all duration-500">

        <BookCover book={book} isPopular={isPopular} />
        <BookInfoSection book={book} />

      </div>


      <div className="flex flex-col gap-6 ">
        <h2 className="text-4xl font-light text-white">More from <span className="font-bold text-gradient-header">{book.category.categoryName}</span> category</h2>
        <HandleLoadingList
          isLoading={isSimilarLoading}
          items={similarBooks}
          errorMsg={similarError}
          itemType="books"
        >
          <DisplayBookCards books={similarBooks.filter((b) => b.bookID != book.bookID)} />
        </HandleLoadingList>


      </div>

    </div>



  );
};

export default BookDetails;
