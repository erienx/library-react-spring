import { HandleLoadingList } from "../components/HandleLoadingList";
import { useAuth } from "../components/providers/AuthContext";
import useFetchCartItems from "../hooks/api/cart/useFetchCartItems";
import DisplayBookList from "../components/DisplayBookList";
import ButtonRegular from "../components/ui/ButtonRegular";
import { useState } from "react";
import useCommitOrder from "../hooks/api/cart/useCommitOrder";

const CartPage = () => {
  const { currentUser, authToken, loading: userLoading } = useAuth();
  const { booksInCart, errorMsg, loading, refetch } = useFetchCartItems(currentUser, authToken);

  const { commitOrder, commitLoading, commitMessage } = useCommitOrder(authToken, refetch);

  if (userLoading || loading) {
    return <div className="text-white text-center mt-10 text-xl">Loading your cart...</div>;
  }

  if (!currentUser) {
    return <div className="text-white text-center mt-10 text-xl">Please log in to view your cart</div>;
  }

  return (
    <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative z-10 gap-y-4">
      <h1 className="text-white text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {booksInCart.length > 0 && (
        <p className="text-slate-300 text-center ">
          {booksInCart.length} {booksInCart.length === 1 ? "item" : "items"} in your cart
        </p>
      )}

      {commitMessage && (
        <div className="text-center text-md font-medium text-slate-200">{commitMessage}</div>
      )}

      <HandleLoadingList isLoading={loading} items={booksInCart} errorMsg={errorMsg} searchInp="" itemType="books" >
        <DisplayBookList books={booksInCart} onRemove={refetch} />
      </HandleLoadingList>

      {booksInCart.length > 0 &&
        <ButtonRegular
          text={commitLoading ? "Committing..." : "Commit Order"}
          onClick={commitOrder}
        />}
    </div>
  );
};


export default CartPage;