import { HandleLoadingList } from "../components/HandleLoadingList";
import { useAuth } from "../components/providers/AuthContext";
import DisplayBookCards from "../components/DisplayBookCards";
import useFetchCartItems from "../hooks/api/cart/useFetchCartItems";

const CartPage = () => {
  const { currentUser, authToken, loading: userLoading } = useAuth();
  const { booksInCart, errorMsg, loading } = useFetchCartItems(currentUser, authToken);

  if (userLoading || loading) {
    return (
      <div className="text-white text-center mt-10 text-xl">
        Loading your cart...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="text-white text-center mt-10 text-xl">
        Please log in to view your cart
      </div>
    );
  }

  return (
    <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative z-10">
      <h1 className="text-white text-3xl font-bold mb-6 text-center">Your Cart</h1>
      <HandleLoadingList
        isLoading={loading}
        items={booksInCart}
        errorMsg={errorMsg}
        searchInp=""
        itemType="books">
        <DisplayBookCards books={booksInCart} />
      </HandleLoadingList>
    </div>
  );
};

export default CartPage;