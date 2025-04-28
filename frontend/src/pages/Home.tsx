import  { useState } from 'react';
import Search from '../components/ui/Search';
import Spinner from '../components/ui/Spinner';
import BookCard from '../components/BookCard';
import HeroSection from '../components/HeroSection';
import useDebounce from '../hooks/useDebounce';
import useFetchBooksApi from '../hooks/api/useFetchBooksApi';
import FeaturesInfo from '../components/FeaturesInfo';
import { Book } from '../types/types';


const Home = () => {
      const [searchInp, setSearchInp] = useState('');
      const debouncedSearchInp = useDebounce(searchInp, 1000);
      const {books,errorMsg,isLoading} = useFetchBooksApi(debouncedSearchInp);
    const getContent = () => {
        if (isLoading || books==null) return <Spinner/>;
        if (errorMsg){
          return (
            <div className="flex justify-center items-center">
            <h3 className="text-3xl text-red-500">{errorMsg}</h3>
            </div>)
        }
        if (!isLoading && searchInp && books.length === 0){
          return (
            <div className="flex justify-center items-center">
            <h3 className="text-3xl text-white">No books found</h3>
            </div>)
        }
        if (books.length==0){
          return <Spinner/>
        }
        return (
        <ul className='grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {books.map((book: Book) => {
              return <BookCard key={book.bookID} book = {book}/>
          })}
        </ul>)
    }

  return (
    <div className="bg-pattern w-full min-h-screen bg-center bg-cover overflow-x-hidden">
      <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative z-10">
        <HeroSection />
        <Search searchInp={searchInp} setSearchInp={setSearchInp} />
        <section className="space-y-9">
          <h2 className="mt-[40px] text-2xl font-bold sm:text-3xl">
            <span className="text-gradient">All books</span>
          </h2>
          {getContent()}
        </section>
        <FeaturesInfo/>
      </div>
    </div>
  )

}

export default Home;