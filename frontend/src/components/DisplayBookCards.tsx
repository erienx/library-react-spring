import { Book } from '../types/types'
import BookCard from './BookCard';
import ButtonRegular from './ui/ButtonRegular';

type DisplayBookCardsProps = {
  books: Book[];
  loadChunk?: number;
}

const DisplayBookCards = ({ books, loadChunk }: DisplayBookCardsProps) => {
  if (books.length <= 0)
    return null;

  return (
    <div className='flex flex-col gap-4'>
      <ul className='grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {books.slice(0, loadChunk ?? books.length).map((book: Book) => (
          <BookCard key={book.bookID} book={book} />
        ))}
      </ul>
      <p className='text-slate-200 text-md text-center'>Displayed {loadChunk ? loadChunk : books.length} books</p>
      {loadChunk && <ButtonRegular text="LOAD MORE" />}
    </div>
  );
};
export default DisplayBookCards