import { useParams } from "react-router-dom"
import useFetchSingleBookApi from "../hooks/api/useFetchSingleBookApi";
import BookDetails from "../components/BookDetails";
import { HandleLoadingSingleItem } from "../components/HandleLoadingSingleItem";

export const BookPage = () => {
    const params = useParams<{ id: string }>();
    const { book, errorMsg, isLoading } = useFetchSingleBookApi(params.id);

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
