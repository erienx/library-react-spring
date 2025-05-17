import { useState, useEffect } from "react";
import { Book } from "../../types/types";

const useFetchBooks = (search: string, page: number, size: number, sortBy: string) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          size: size.toString(),
          sort: sortBy,
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

        setBooks(prev =>
        page === 0 ? data.content : [...prev, ...data.content]
      );
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
  }, [search, page, size, sortBy]);

  return { books, errorMsg, isLoading, hasMore };
};


export default useFetchBooks;