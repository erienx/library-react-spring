import { useState, useEffect } from "react";
import { User } from "../../../types/types";

const useFetchCartItems = (currentUser: User | null | undefined, authToken: string | null | undefined) => {
  const [booksInCart, setBooksInCart] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCartBooks = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:8080/carts/items?memberId=${currentUser.memberId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("failed to fetch cart items");

        const data = await res.json();
        setBooksInCart(data);
      } catch (err:any) {
        if (err.name !== "AbortError") {
          setErrorMsg("failed to load cart items");
          setBooksInCart([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCartBooks();

    return () => {
      controller.abort();
    };
  }, [currentUser, authToken]);

  return { booksInCart, errorMsg, loading };
};

export default useFetchCartItems;
