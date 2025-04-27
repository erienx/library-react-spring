import { useState, useEffect } from "react";

const useFetchBooks = (value: string) => {
    const [books, setBooks] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(true);

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