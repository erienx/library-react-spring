import { useState, useEffect } from "react";

const useFetchBooks = (value: string) => {
    const [books, setBooks] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const uploadBook = async (bookData:any) => {
      try {
          const response = await fetch('http://localhost:8080/books', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json', 
              },
              body: JSON.stringify(bookData), 
          });

          if (!response.ok) {
              throw new Error('Failed to upload book');
          }

          const result = await response.json();
          console.log('Book uploaded successfully:', result);
      } catch (error) {
          console.error('Error uploading book:', error);
      }
  };


    useEffect(() => {
        const controller = new AbortController();
    
        const fetchData = async (value = '') => {
          setIsLoading(true);
          try {
            const url = value
      ? `/search.json?title=${encodeURIComponent(value)}`
      : "/trending/weekly.json";
      
            console.log(url); 
            const res = await fetch(url, { signal: controller.signal });
            if (!res.ok) {
              throw new Error("Books fetch failed.");
            }
      
            let data = await res.json();
            data = value ? data.docs : data.works;
      
            if (!data) {
              setErrorMsg("No books found.");
              setBooks([]);
              return;
            }
      
            setBooks(data);

            if (data.length > 0) {
              const bookData = {
                  title: data[0].title,
                  publicationDate: data[0].first_publish_year,  
                  author: data[0].author_name ? data[0].author_name[0] : "Unknown",
                  pathToCover: `https://covers.openlibrary.org/b/olid/${data[0].cover_edition_key}-M.jpg`,
                  pages: 250, 
                  rentedCount: 0, 
              };
              uploadBook(bookData);  
          }
          } catch (error: any) {
            if (error.name !== "AbortError") {
              setErrorMsg("Error fetching books.");
              setBooks([]); 
            }
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchData(value);
        return () => {
          controller.abort();
        };
      }, [value]);

      return {books,errorMsg,isLoading}
}

export default useFetchBooks;