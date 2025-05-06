import { useParams } from "react-router-dom"
import useFetchSingleBook from "../hooks/api/useFetchSingleBook";
import BookDetails from "../components/BookDetails";
import { HandleLoadingSingleItem } from "../components/HandleLoadingSingleItem";

export const BookPage = () => {
    const params = useParams<{ id: string }>();
    const { book, errorMsg, isLoading } = useFetchSingleBook(params.id);

    return (
        <>
            <HandleLoadingSingleItem
                isLoading={isLoading}
                errorMsg={errorMsg}
                notFoundCondition={!book}
                notFoundMessage="Book not found"
            >
                {book && <BookDetails book={book} />}
            </HandleLoadingSingleItem>
        </>
    );
}
