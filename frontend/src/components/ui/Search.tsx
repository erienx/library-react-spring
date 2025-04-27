import  { Dispatch, SetStateAction } from 'react'
import SearchIcon from '../../assets/search-icon.svg?react';

interface SearchProps{
  searchInp: string;
  setSearchInp: Dispatch<SetStateAction<string>>;
}

const Search = ({searchInp,setSearchInp}: SearchProps) => {
  return (
    <div className='w-full max-w-4xl mx-auto py-4 px-3 bg-linear-to-t from-bg-lighter to-bg-lighter2 rounded-lg mt-10 z-10 shadow-lg shadow-black/10 hover:shadow-black/20 transition-shadow duration-300'>
      <div className='relative flex items-center group'>
        <SearchIcon className='text-accent1 group-hover:text-accent1-hover transition-colors duration-300 filter saturate-80'/>
        <input className="w-full py-2 pl-4 sm:pr-10 regular-text text-txt placeholder-light-200 outline-hidden bg-transparent;"
        placeholder='Search for a book' 
        type='text' 
        value={searchInp} 
        onChange={(e)=>setSearchInp(e.target.value)}/>
      </div>

    </div>
  )
}

export default Search