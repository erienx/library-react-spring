import { useState } from 'react';
import { Book } from '../types/types'
import BookCard from './BookCard';
import ButtonRegular from './ui/ButtonRegular';

type DisplayBookCardsProps = {
  books: Book[];
  loadChunk?: number;
}

const DisplayBookCards = ({ books, loadChunk }: DisplayBookCardsProps) => {
  const [displayedBooks, setDisplayedBooks] = useState(loadChunk);

  const handleButtonClick = () => {
    setDisplayedBooks((b) => {
      if (b && loadChunk) {
        return b + loadChunk;
      }
    });
  }

  if (books.length <= 0)
    return null;

  return (
    <div className='flex flex-col gap-4'>
      <ul className='grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {books.slice(0, displayedBooks ?? books.length).map((book: Book) => (
          <BookCard key={book.bookID} book={book} />
        ))}
      </ul>
      <p className='text-slate-200 text-md text-center'>Displayed {displayedBooks ?? books.length} {books.length == 1 ? "book" : "books"}</p>
      {displayedBooks && <ButtonRegular text="LOAD MORE" onClick={handleButtonClick} />}
    </div>
  );
};
export default DisplayBookCards