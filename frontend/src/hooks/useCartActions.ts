import { useState, useEffect } from "react";
import { fetchBookCopies } from "./api/fetchBooksCopies";
import { useAuth } from "../components/providers/AuthContext";
import { Book } from "../types/types";
import { addBookToCart } from "./api/cart/addBookToCart";
import { checkBookInCart } from "./api/cart/checkBookInCart";
import { removeBookFromCart } from "./api/cart/removeBookFromCart";

export const useCartActions = (book: Book) => {
  const { currentUser, authToken } = useAuth();
  const [addedToCart, setAddedToCart] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [availableCopies, setAvailableCopies] = useState<number | null>(null);
  const [totalCopies, setTotalCopies] = useState<number | null>(null);

  useEffect(() => {
    const checkCart = async () => {
      if (!currentUser || !book.bookID) return;
      try {
        const result = await checkBookInCart(currentUser.memberId, book.bookID, authToken);
        setAddedToCart(result);
      } catch (error) {
        console.error("Failed to check cart status", error);
      }
    };
    checkCart();
  }, [book.bookID, currentUser, authToken]);

  useEffect(() => {
    const fetchCopyCount = async () => {
      if (!book.bookID) return;
      try {
        const { availableCopies, totalCopies } = await fetchBookCopies(book.bookID);
        setAvailableCopies(availableCopies);
        setTotalCopies(totalCopies);
      } catch (err) {
        console.error("Failed to fetch copy count", err);
      }
    };
    fetchCopyCount();
  }, [book.bookID]);

  const handleAddToCart = async () => {
    if (!currentUser || !book.bookID) return;
    setLoadingCart(true);
    try {
      await addBookToCart(currentUser.memberId, book.bookID, authToken);
      setAddedToCart(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoadingCart(false);
    }
  };

  const handleRemoveFromCart = async () => {
    if (!currentUser || !book.bookID) return;
    setLoadingCart(true);
    try {
      await removeBookFromCart(currentUser.memberId, book.bookID, authToken);
      setAddedToCart(false);
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      setLoadingCart(false);
    }
  };

  return {
    addedToCart,
    loadingCart,
    availableCopies,
    totalCopies,
    handleAddToCart,
    handleRemoveFromCart,
  };
};
