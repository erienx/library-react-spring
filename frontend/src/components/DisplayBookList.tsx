import { Book } from "../types/types";
import BookCardLine from "./BookCardLine";

type Props = {
    books: Book[];
    onRemove?: () => void;
};

const DisplayBookList = ({ books, onRemove }: Props) => {

    if (books.length === 0) {
        return <p className="text-white text-center">Your cart is empty.</p>;
    }

    return (
        <ul className="flex flex-col gap-6">
            {books.map((book) => (
                <BookCardLine key={book.bookID} book={book} onRemove={onRemove} />
            ))}
        </ul>
    );
};



export default DisplayBookList;
