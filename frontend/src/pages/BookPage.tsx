import { useParams } from "react-router-dom"
import useFetchSingleBook from "../hooks/api/useFetchSingleBook";
import BookDetails from "../components/BookDetails";
import { HandleLoadingSingleItem } from "../components/HandleLoadingSingleItem";
import { useTranslation } from "react-i18next";

export const BookPage = () => {
    const params = useParams<{ id: string }>();
    const { book, errorMsg, isLoading } = useFetchSingleBook(params.id);
    const { t } = useTranslation();

    return (
        <>
            <HandleLoadingSingleItem
                isLoading={isLoading}
                errorMsg={errorMsg}
                notFoundCondition={!book}
                notFoundMessage={t('bookNotFound')}
            >
                {book && <BookDetails book={book} />}
            </HandleLoadingSingleItem>
        </>
    );
}
