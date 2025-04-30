import Search from '../components/ui/Search';
import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import DisplayBookCards from '../components/DisplayBookCards';
import { HandleLoadingList } from '../components/HandleLoadingList';

import { useSearchParams } from 'react-router-dom';
import useFetchBooksByQueryApi from '../hooks/api/useFetchBooksByQueryApi';

type SearchBooksTemplateProps = {
    queryType: 'author' | 'publisher';
    placeholder: string;
    emptySearchMessage: string;
};

export const SearchBooksTemplate = ({ queryType, placeholder, emptySearchMessage }: SearchBooksTemplateProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get('q') || '';
    const [searchInp, setSearchInp] = useState(searchTerm);
    const debouncedSearchInp = useDebounce(searchInp, 1000);

    const { books, errorMsg, isLoading } = useFetchBooksByQueryApi(queryType, debouncedSearchInp);

    useEffect(() => {
        if (debouncedSearchInp !== searchTerm) {
            setSearchParams({ q: debouncedSearchInp });
        }
    }, [debouncedSearchInp, searchTerm, setSearchParams]);

    return (
        <div className='mx-5'>
            <Search
                searchInp={searchInp}
                setSearchInp={setSearchInp}
                placeholder={placeholder}
            />
            <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative z-10">

                {debouncedSearchInp ?
                    <HandleLoadingList
                        isLoading={isLoading}
                        items={books}
                        errorMsg={errorMsg}
                        searchInp={searchInp}
                        itemType="books">

                        <DisplayBookCards books={books} />

                    </HandleLoadingList>
                    : <p className='text-white text-3xl text-center'>{emptySearchMessage}</p>}

            </div>
        </div>
    );
};

