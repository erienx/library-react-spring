import { useState } from "react";
import { Book } from "../../types/types";
import { Link } from "react-router-dom";
import Rating from "../ui/Rating";
import { useAuth } from "../providers/AuthContext";

type BookInfoSectionProps = {
    book: Book;
};

const BookInfoSection = ({ book }: BookInfoSectionProps) => {
    const { currentUser, loading: loadingUser, authToken } = useAuth();
    const [addedToCart, setAddedToCart] = useState(false);
    const [loadingCart, setLoadingCart] = useState(false);

    const handleAddToCart = async () => {
        if (!currentUser || !book.bookID) return;
        setLoadingCart(true);
        try {
            const response = await fetch("http://localhost:8080/carts/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    memberId: currentUser.memberId,
                    bookId: book.bookID,
                }),
                credentials: "include",
            });

            if (!response.ok) throw new Error("failed to add to cart");

            setAddedToCart(true);
        } catch (error) {
            console.error("error adding to cart:", error);
        } finally {
            setLoadingCart(false);
        }
    };

    const handleRemoveFromCart = () => {
        setAddedToCart(false);
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
