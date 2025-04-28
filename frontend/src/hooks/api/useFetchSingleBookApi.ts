import { useState, useEffect } from "react";
import { Book } from "../../types/types";


const useFetchSingleBookApi = (id: string | undefined) => {
    const [book, setBook] = useState<Book | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        const controller = new AbortController();
    
        const fetchData = async () => {
          setIsLoading(true);
          try {
            const url = `http://localhost:8080/books/${id}`;

      
            const res = await fetch(url, { signal: controller.signal });
            if (!res.ok) {
              throw new Error("Books fetch failed.");
            }
      
            let data = await res.json();
      
            if (!data) {
              setErrorMsg("No books found.");
              setBook(null);
              return;
            }
      
            setBook(data);  
          }
          catch (error: any) {
            if (error.name !== "AbortError") {
              setErrorMsg("Error fetching books.");
              setBook(null); 
            }
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchData();
        return () => {
          controller.abort();
        };
      }, [id]);
      return {book,errorMsg,isLoading}
}

export default useFetchSingleBookApi;