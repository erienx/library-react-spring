import { Book } from "../../types/types";
import { Link } from "react-router-dom";
import Rating from "../ui/Rating";
import { useAuth } from "../providers/AuthContext";
import { useCartActions } from "../../hooks/useCartActions";
import { useTranslation } from "react-i18next";

type BookInfoSectionProps = {
  book: Book;
};

const BookInfoSection = ({ book }: BookInfoSectionProps) => {
  const { currentUser, loading: loadingUser } = useAuth();
  const { addedToCart, loadingCart, availableCopies, totalCopies, handleAddToCart, handleRemoveFromCart } = useCartActions(book);
  const { t } = useTranslation();

  return (
    <section className="flex flex-col flex-grow gap-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">{book.title}</h1>
        <Link to={`/author?q=${book.author.authorName}`} className="text-xl text-accent2 hover:underline">
          {t('by')} {book.author.authorName}
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Rating rating={book.rating} />
        <span className="text-slate-300 text-sm">{t('rentals', { count: book.rentedCount })}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-200">
        <div className="flex flex-col">
          <span className="font-semibold text-white">{t('publicationYear')}:</span>
          <span>{book.publicationYear}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-white">{t('pages')}:</span>
          <span>{book.pages}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-white">{t('publisher')}:</span>
          <Link to={`/publisher?q=${book.publisher.publisherName}`} className="text-accent2 hover:underline">
            {book.publisher.publisherName}
          </Link>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-white">{t('category')}:</span>
          <span>{book.category.categoryName}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-white">{t('addedToLibrary')}:</span>
          <span>{new Date(book.addedDate).toLocaleDateString()}</span>
        </div>
      </div>

      {!loadingUser && currentUser && (
        <div className="mt-auto flex gap-4 group">
          {!addedToCart ? (
            <button
              onClick={handleAddToCart}
              disabled={loadingCart || availableCopies === 0}
              className="px-6 py-3 bg-accent1 text-white font-semibold rounded-xl shadow-md hover:bg-accent1-hover disabled:opacity-50">
              {loadingCart ? t('adding') : t('addToCart')}
            </button>
          ) : (
            <button
              onClick={handleRemoveFromCart}
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700">
              {t('removeFromCart')}
            </button>
          )}
          {availableCopies !== null && totalCopies !== null && (
            <span className="text-sm text-slate-300 self-center">
              {availableCopies}/{totalCopies} {t('copiesAvailable')}
            </span>
          )}
        </div>
      )}
    </section>
  );
};

export default BookInfoSection;
