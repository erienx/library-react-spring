import { useTranslation } from 'react-i18next';
import { Book } from '../types/types'
import BookCard from './BookCard';
import ButtonRegular from './ui/ButtonRegular';

type DisplayBookCardsProps = {
  books: Book[];
  onLoadMore: () => void;
  hasMore: boolean;
}

const DisplayBookCards = ({ books, onLoadMore, hasMore }: DisplayBookCardsProps) => {
  const { t } = useTranslation();


  if (books.length <= 0)
    return null;

  return (
    <div className='flex flex-col gap-4'>
      <ul className='grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {books.map((book: Book) => (
          <BookCard key={book.bookID} book={book} />
        ))}
      </ul>
      <p className='text-slate-200 text-md text-center'>{t('displayedBooks', { count: books.length })}</p>
      {hasMore && <ButtonRegular text={t('loadMore')} onClick={onLoadMore} />}
    </div>
  );
};
export default DisplayBookCards