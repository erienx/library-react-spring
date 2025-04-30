import { useState, useEffect } from "react";
import { Book } from "../../types/types";

const useFetchBooksByAuthorNameApi = (authorName: string) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authorName || authorName.trim().length === 0) {
      setBooks([]);
      setIsLoading(false);
      return;
    }
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // await new Promise(resolve => setTimeout(resolve,2000));
        const url = `http://localhost:8080/books/author/${encodeURIComponent(authorName)}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error("Books fetch failed.");
        }

        const data = await res.json();
        if (!data || !data.content) {
          setErrorMsg("No books found.");
          setBooks([]);
          return;
        }

        setBooks(data.content);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          setErrorMsg("Error fetching books.");
          setBooks([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [authorName]);
  return { books, errorMsg, isLoading };
};

export default useFetchBooksByAuthorNameApi;
