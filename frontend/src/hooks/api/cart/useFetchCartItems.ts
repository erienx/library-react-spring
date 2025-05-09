import { useState, useEffect } from "react";
import { User } from "../../../types/types";

const useFetchCartItems = (user: User | null | undefined, token: string | null | undefined) => {
  const [booksInCart, setBooksInCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/carts/items?memberId=${user.memberId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBooksInCart(data);
    } catch (err) {
      setErrorMsg("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, token]);

  return { booksInCart, errorMsg, loading, refetch: fetchData };
};

export default useFetchCartItems;
