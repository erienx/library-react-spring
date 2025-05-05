import { useState, useEffect } from "react";
import { Book } from "../../types/types";

const useFetchBooksByQueryApi = (queryType: 'publisher' | 'author', name: string, page: number, size = 20) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!name || name.trim().length === 0) {
      setBooks([]);
      setIsLoading(false);
      setTotalPages(0);
      return;
    }
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // await new Promise(resolve => setTimeout(resolve,2000));
        const url = `http://localhost:8080/books/${queryType}/${encodeURIComponent(name)}?page=${page}&size=${size}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error("Books fetch failed.");
        }

        const data = await res.json();
        if (!data || !data.content) {
          setErrorMsg("No books found.");
          setBooks([]);
          setTotalPages(0);
          setIsLoading(false);
          return;
        }

        setBooks(data.content);
        setTotalPages(data.totalPages || 0);

      } catch (error: unknown) {
        if (error instanceof Error && error.name !== "AbortError") {
          setErrorMsg("Error fetching books.");
          setBooks([]);
          setTotalPages(0);
          setIsLoading(false);
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [name, queryType, page, size]);
  return { books, errorMsg, isLoading, totalPages };
};

export default useFetchBooksByQueryApi;
