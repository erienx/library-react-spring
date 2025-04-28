import { Book } from '../types/types'
import BookCard from './BookCard';

type DisplayBookCardsProps = {
  books: Book[];
}

const DisplayBookCards = ({ books }: DisplayBookCardsProps) => {
  return (
    <ul className='grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {books.map((book: Book) => {
        return <BookCard key={book.bookID} book={book} />
      })}
    </ul>)
}

export default DisplayBookCards