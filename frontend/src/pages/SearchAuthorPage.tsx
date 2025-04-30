import { useParams } from 'react-router-dom';
import Search from '../components/ui/Search';
import { useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import useFetchBooksApi from '../hooks/api/useFetchBooksApi';
import DisplayBookCards from '../components/DisplayBookCards';
import { HandleLoadingList } from '../components/HandleLoadingList';

export const SearchAuthorPage = () => {
    const { searchTerm } = useParams();
    const [searchInp, setSearchInp] = useState(searchTerm || '');
    const debouncedSearchInp = useDebounce(searchInp, 1000);
    const { books, errorMsg, isLoading } = useFetchBooksApi(debouncedSearchInp);

    return (
        <div>
            <Search searchInp={searchInp} setSearchInp={setSearchInp} placeholder='Search for an author' />

            <HandleLoadingList
                isLoading={isLoading}
                items={books}
                errorMsg={errorMsg}
                searchInp={searchInp}
                itemType="books">
                <DisplayBookCards books={books} />
            </HandleLoadingList>
        </div>
    );
};
