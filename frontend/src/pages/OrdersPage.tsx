import { useState } from "react";
import DisplayBookList from "../components/DisplayBookList";
import { useAuth } from "../components/providers/AuthContext";
import SelectOrderType from "../components/ui/SelectOrderType";
import useFetchCartItems from "../hooks/api/cart/useFetchCartItems";

const OrdersPage = () => {
    const { currentUser, authToken, loading: userLoading } = useAuth();
    const { booksInCart, loading } = useFetchCartItems(currentUser, authToken);
    const [orderType, setOrderType] = useState("pending");

    if (userLoading || loading) {
        return (
            <div className="text-white text-center mt-10 text-xl">
                Loading your orders...
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className="text-white text-center mt-10 text-xl">
                Please log in to view your orders
            </div>
        );
    }

    return (
        <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative z-10">
            <h1 className="text-white text-3xl font-bold mb-6 text-center">Your Orders</h1>
            <div className="flex flex-row gap-x-3 items-center justify-center mb-3">
                <p className="text-slate-100 text-center text-md">Choose order type</p>
                <SelectOrderType orderType={orderType} handleOrderTypeChannge={(val) => setOrderType(val)} />
            </div>
                <DisplayBookList books={booksInCart} />
        </div>
    );
};

export default OrdersPage;