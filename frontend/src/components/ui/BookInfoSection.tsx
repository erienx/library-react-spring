import { Book } from "../../types/types";
import { Link } from "react-router-dom";
import Rating from "../ui/Rating";

type BookInfoSectionProps = {
    book: Book;
};

const BookInfoSection = ({ book }: BookInfoSectionProps) => {
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

            <div className="mt-auto flex gap-4 group">
                <Link to="/" className="px-18 py-3 bg-gradient-to-r from-accent1/80 to-accent1-hover/80 text-white font-semibold rounded-xl shadow-md hover:from-accent1/60 hover:to-accent1-hover/60">
                    Add to Cart
                </Link>
            </div>
        </section>
    );
};

export default BookInfoSection;
