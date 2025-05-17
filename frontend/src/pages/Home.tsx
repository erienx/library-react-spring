import { useState } from 'react';
import Search from '../components/ui/Search';
import HeroSection from '../components/ui/HeroSection';
import useDebounce from '../hooks/useDebounce';
import useFetchBooks from '../hooks/api/useFetchBooks';
import FeaturesInfo from '../components/FeaturesInfo';
import DisplayBookCards from '../components/DisplayBookCards';
import { HandleLoadingList } from '../components/HandleLoadingList';
import SelectSort from '../components/ui/SelectSort';
import SelectPageSize from '../components/ui/SelectPageSize';


const Home = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(8);
  const [searchInp, setSearchInp] = useState('');
  const debouncedSearchInp = useDebounce(searchInp, 1000);
  const [sortBy, setSortBy] = useState("rating,desc");
  const { books, errorMsg, isLoading, hasMore } = useFetchBooks(debouncedSearchInp, page, size, sortBy);

  const loadMoreBooks = () => {
    setPage(prev => prev + 1);
  };


  return (
    <div className="bg-pattern w-full min-h-screen bg-center bg-cover overflow-x-hidden">
      <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative z-10 gap-3">
        <HeroSection />
        <Search searchInp={searchInp} setSearchInp={setSearchInp} placeholder='Search for a book' />

        <section className="space-y-9">
          <h2 className="mt-[40px] text-2xl font-bold sm:text-3xl">
            <div className="flex flex-col sm:flex-row gap-y-5 sm:gap-x-3 justify-between items-center">
              <span className="text-gradient sm:order-1 text-4xl">All books</span>
              <div className="flex flex-col sm:flex-row items-center gap-y-3 sm:gap-x-3 sm:order-2 w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row items-center gap-y-2 sm:gap-x-2 w-full sm:w-auto">
                  <p className="font-medium sm:text-2xl text-xl text-white">Sort by: </p>
                  <SelectSort sortBy={sortBy} handleSortChange={(val) => {
                    setSortBy(val);
                    setPage(0);
                  }}
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-y-2 sm:gap-x-2 w-full sm:w-auto">
                  <p className="font-medium sm:text-2xl text-xl text-white">Page size:</p>
                  <SelectPageSize size={size} handleSizeChange={(val) => {
                    setSize(val);
                    setPage(0);
                  }}
                  />
                </div>
              </div>
            </div>
          </h2>

          <HandleLoadingList
            isLoading={isLoading}
            items={books}
            errorMsg={errorMsg}
            searchInp={searchInp}
            itemType="books"
          >
            <DisplayBookCards books={books} onLoadMore={loadMoreBooks} hasMore={hasMore} />
          </HandleLoadingList>


        </section>
        <FeaturesInfo />
      </div>
    </div>
  )

}

export default Home;