import { useState, useEffect } from "react";
import { Book } from "../../types/types";

const useFetchBooksByCategoryApi = (categoryId: number, limit = 8) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) {
      setErrorMsg('Invalid category ID');
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // await new Promise(resolve => setTimeout(resolve,2000));
        const url = `http://localhost:8080/books/category/${categoryId}?size=${limit}`;
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
  }, [categoryId, limit]);
  return { books, errorMsg, isLoading };
};

export default useFetchBooksByCategoryApi;
