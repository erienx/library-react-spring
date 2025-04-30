import { SearchBooksTemplate } from "./SearchBooksTemplate"

const SearchBooksAuthor = () => {
    return (
        <SearchBooksTemplate queryType='author' placeholder='Search for an author' emptySearchMessage='Please search for an author' />
    )
}

export default SearchBooksAuthor