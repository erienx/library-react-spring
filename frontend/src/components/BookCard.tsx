type BookProps = {
    book: {
        title:string;
        pathToCover:string;
        publicationYear:number;
    };
};


const BookCard = ({book}:BookProps) => {
    const { title, pathToCover, publicationYear } = book;
    const cover_size = 'M';
  return (
    <div className='bg-linear-to-t from-bg to-bg-lighter p-5 rounded-2xl shadow-lg shadow-black/25 flex flex-col'>
        <img className="rounded-lg h-auto w-auto max-h-[300px]"
        src={pathToCover ? pathToCover: '/no-img.png'} alt={`poster of ${title}`}/>
        <div className='mt-5'>
            <h3 className='text-white font-bold text-base line-clamp-1'>{title}</h3>
            <div className='flex flex-row items-center flex-wrap gap-1 bottom-0 mt-5'>
                <p className='text-gray-300'>Logged <span className='text-white font-bold'>342</span> times</p>

                <span className='text-sm text-gray-100'>•</span>

                <p className='text-gray-100 font-medium text-base'>{publicationYear}</p>


            </div>
        </div>
    </div>
  )
}

export default BookCard