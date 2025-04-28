import { useParams } from "react-router-dom"
import useFetchSingleBookApi from "../hooks/api/useFetchSingleBookApi";
import Spinner from "../components/ui/Spinner";
import BookDetails from "../components/BookDetails";

export const BookPage = () => {
    const params = useParams<{ title: string, id: string }>();
    const {book, errorMsg, isLoading} = useFetchSingleBookApi(params.id);

    const getContent = () => {
        if (isLoading) {
            return <Spinner/>;
        }
        if (errorMsg){
          return (
            <div className="flex justify-center items-center">
            <h3 className="text-3xl text-red-500">{errorMsg}</h3>
            </div>)
        }
        if (book == null){
          return (
            <div className="flex justify-center items-center">
            <h3 className="text-3xl text-white">Book not found</h3>
            </div>)
        }
        return ( <BookDetails book={book}/> )
    }

    return (
        <>
            {getContent()}
        </>
    );
}
