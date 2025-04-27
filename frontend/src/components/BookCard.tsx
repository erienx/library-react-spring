type BookProps = {
    book: {
        title:string;
        cover_edition_key:string;
        first_publish_year:number;
    };
};


const BookCard = ({book}:BookProps) => {
    const { title, cover_edition_key, first_publish_year } = book;
    const cover_size = 'M';
    const cover_path = `https://covers.openlibrary.org/b/olid/${cover_edition_key}-${cover_size}.jpg`;
  return (
    <div className='bg-linear-to-t from-bg to-bg-lighter p-5 rounded-2xl shadow-lg shadow-black/25 flex flex-col'>
        <img className="rounded-lg h-auto w-auto max-h-[300px]"
        src={cover_edition_key ? cover_path : '/no-img.png'} alt={`poster of ${title}`}/>
        <div className='mt-5'>
            <h3 className='text-white font-bold text-base line-clamp-1'>{title}</h3>
            <div className='flex flex-row items-center flex-wrap gap-1 bottom-0 mt-5'>
                <p className='text-gray-300'>Logged <span className='text-white font-bold'>342</span> times</p>

                <span className='text-sm text-gray-100'>•</span>

                <p className='text-gray-100 font-medium text-base'>{first_publish_year}</p>


            </div>
        </div>
    </div>
  )
}

export default BookCard