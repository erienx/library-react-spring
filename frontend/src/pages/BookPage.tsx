import { useParams } from "react-router-dom"

export const BookPage = () => {
    const params = useParams<{ query: string }>();

    return (
        <div>BookPage, title search: {params.query}</div>
    );
}
