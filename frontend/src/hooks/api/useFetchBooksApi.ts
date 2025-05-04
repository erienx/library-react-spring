import { useState, useEffect } from "react";

const useFetchBooksApi = (value: string) => {
  const [books, setBooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (value = '') => {
      setIsLoading(true);
      // await new Promise(resolve => setTimeout(resolve,2000));
      try {
        const url = value ? `http://localhost:8080/books?search=${value}` : "http://localhost:8080/books";


        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error("Books fetch failed.");
        }

        const data = await res.json();

        if (!data) {
          setErrorMsg("No books found.");
          setBooks([]);
          return;
        }

        setBooks(data);
      }
      catch (error: any) {
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

  return { books, errorMsg, isLoading }
}

export default useFetchBooksApi;