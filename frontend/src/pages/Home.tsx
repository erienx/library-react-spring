import { useState } from 'react';
import Search from '../components/ui/Search';
import HeroSection from '../components/ui/HeroSection';
import useDebounce from '../hooks/useDebounce';
import useFetchBooksApi from '../hooks/api/useFetchBooksApi';
import FeaturesInfo from '../components/FeaturesInfo';
import DisplayBookCards from '../components/DisplayBookCards';
import { HandleLoadingList } from '../components/HandleLoadingList';


const Home = () => {
  const [searchInp, setSearchInp] = useState('');
  const debouncedSearchInp = useDebounce(searchInp, 1000);
  const { books, errorMsg, isLoading } = useFetchBooksApi(debouncedSearchInp);

  return (
    <div className="bg-pattern w-full min-h-screen bg-center bg-cover overflow-x-hidden">
      <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative z-10 gap-3">
        <HeroSection />
        <Search searchInp={searchInp} setSearchInp={setSearchInp} placeholder='Search for a book' />
        <section className="space-y-9">
          <h2 className="mt-[40px] text-2xl font-bold sm:text-3xl">
            <span className="text-gradient">All books</span>
          </h2>

          <HandleLoadingList
            isLoading={isLoading}
            items={books}
            errorMsg={errorMsg}
            searchInp={searchInp}
            itemType="books"
          >
            <DisplayBookCards books={books} loadChunk={8} />
          </HandleLoadingList>


        </section>
        <FeaturesInfo />
      </div>
    </div>
  )

}

export default Home;