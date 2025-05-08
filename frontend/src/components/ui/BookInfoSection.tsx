import { useEffect, useState } from "react";
import { Book } from "../../types/types";
import { Link } from "react-router-dom";
import Rating from "../ui/Rating";
import { useAuth } from "../providers/AuthContext";
import { checkBookInCart } from "../../hooks/api/cart/checkBookInCart";
import { removeBookFromCart } from "../../hooks/api/cart/removeBookFromCart";
import { addBookToCart } from "../../hooks/api/cart/addBookToCart";

type BookInfoSectionProps = {
    book: Book;
};

const BookInfoSection = ({ book }: BookInfoSectionProps) => {
    const { currentUser, loading: loadingUser, authToken } = useAuth();
    const [addedToCart, setAddedToCart] = useState(false);
    const [loadingCart, setLoadingCart] = useState(false);
    useEffect(() => {
        const checkCart = async () => {
          if (!currentUser || !book.bookID) return;
          try {
            const result = await checkBookInCart(currentUser.memberId, book.bookID, authToken);
            setAddedToCart(result);
          } catch (error) {
            console.error("failed to check cart status", error);
          }
        };
        checkCart();
      }, [book.bookID, currentUser, authToken]);
      
      const handleAddToCart = async () => {
        if (!currentUser || !book.bookID) return;
        setLoadingCart(true);
        try {
          await addBookToCart(currentUser.memberId, book.bookID, authToken);
          setAddedToCart(true);
        } catch (error) {
          console.error("error adding to cart:", error);
        } finally {
          setLoadingCart(false);
        }
      };
      
      const handleRemoveFromCart = async () => {
        if (!currentUser || !book.bookID) return;
        setLoadingCart(true);
        try {
          await removeBookFromCart(currentUser.memberId, book.bookID, authToken);
          setAddedToCart(false);
        } catch (error) {
          console.error("error removing from cart:", error);
        } finally {
          setLoadingCart(false);
        }
      };

    return (
        <section className="flex flex-col flex-grow gap-6">
            <div>
                <h1 className="text-4xl font-bold text-white mb-2">{book.title}</h1>
                <Link to={`/author?q=${book.author.authorName}`} className="text-xl text-accent2 hover:underline">
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
                    <Link to={`/publisher?q=${book.publisher.publisherName}`} className="text-accent2 hover:underline">
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

            {!loadingUser && currentUser && (
                <div className="mt-auto flex gap-4 group">
                    {!addedToCart ? (
                        <button
                            onClick={handleAddToCart}
                            disabled={loadingCart}
                            className="px-6 py-3 bg-accent1 text-white font-semibold rounded-xl shadow-md hover:bg-accent1-hover disabled:opacity-50">
                            {loadingCart ? "Adding..." : "Add to Cart"}
                        </button>) : (
                        <button
                            onClick={handleRemoveFromCart}
                            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700">
                            Remove from Cart
                        </button>
                    )}
                </div>
            )}
        </section>
    );
};

export default BookInfoSection;
