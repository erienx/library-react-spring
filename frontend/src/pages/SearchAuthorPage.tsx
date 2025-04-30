import Search from '../components/ui/Search';
import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import useFetchBooksApi from '../hooks/api/useFetchBooksApi';
import DisplayBookCards from '../components/DisplayBookCards';
import { HandleLoadingList } from '../components/HandleLoadingList';

import { useSearchParams } from 'react-router-dom';

export const SearchAuthorPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get('q') || '';
    const [searchInp, setSearchInp] = useState(searchTerm);
    const debouncedSearchInp = useDebounce(searchInp, 1000);

    const { books, errorMsg, isLoading } = useFetchBooksApi(debouncedSearchInp);

    useEffect(() => {
        if (debouncedSearchInp !== searchTerm) {
            setSearchParams({ q: debouncedSearchInp });
        }
    }, [debouncedSearchInp, searchTerm, setSearchParams]);

    return (
        <div>
            <Search
                searchInp={searchInp}
                setSearchInp={setSearchInp}
                placeholder="Search for an author"
            />
            <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative z-10">


                <HandleLoadingList
                    isLoading={isLoading}
                    items={books}
                    errorMsg={errorMsg}
                    searchInp={searchInp}
                    itemType="books">
                    <DisplayBookCards books={books} />
                </HandleLoadingList>
            </div>
        </div>
    );
};

