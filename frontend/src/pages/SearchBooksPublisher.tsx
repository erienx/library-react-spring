import { SearchBooksTemplate } from './SearchBooksTemplate'

const SearchBooksPublisher = () => {
    return (
        <SearchBooksTemplate queryType='publisher' placeholder='Search for a publisher' emptySearchMessage='Please search for a publisher' />
    )
}

export default SearchBooksPublisher