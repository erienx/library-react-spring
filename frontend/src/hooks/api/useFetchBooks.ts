import { useState, useEffect } from "react";
import { Book } from "../../types/types";

const useFetchBooks = (search: string, page: number, size: number) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // For knowing if more pages exist

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          size: size.toString(),
        });
        if (search) params.append('search', search);

        const res = await fetch(`http://localhost:8080/books?${params}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Books fetch failed.");

        const data = await res.json();

        if (!data || !data.content) {
          setErrorMsg("No books found.");
          setBooks([]);
          return;
        }

        setBooks(prev => [...prev, ...data.content]);
        setHasMore(!data.last); 
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

    return () => controller.abort();
  }, [search, page, size]);

  return { books, errorMsg, isLoading, hasMore };
};


export default useFetchBooks;