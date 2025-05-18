// OrdersPage.tsx - Updated with order removal functionality

import { useState } from "react";
import DisplayBookList from "../components/DisplayBookList";
import { useAuth } from "../components/providers/AuthContext";
import SelectOrderType from "../components/ui/SelectOrderType";
import useFetchOrders from "../hooks/api/useFetchOrders";
import useRemoveOrder from "../hooks/api/useRemoveOrder";
import { Order } from "../types/types";
import RemoveButton from "../components/ui/RemoveButton";

const OrdersPage = () => {
    const { currentUser, authToken, loading: userLoading } = useAuth();
    const [orderType, setOrderType] = useState<string>("pending");
    const { orders, loading: ordersLoading, refetch } = useFetchOrders(currentUser?.memberId, authToken, orderType);
    const { removeOrder, loading: removeLoading, error: removeError } = useRemoveOrder(currentUser?.memberId, authToken);


    if (userLoading || ordersLoading) {
        return <div className="text-white text-center mt-10 text-xl">Loading your orders...</div>;
    }

    if (!currentUser) {
        return <div className="text-white text-center mt-10 text-xl">Please log in to view your orders</div>;
    }

    const handleRemoveOrder = async (orderId: number) => {
        await removeOrder(orderId);
        refetch();
    };

    return (
        <div className="px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative z-10">
            <h1 className="text-white text-3xl font-bold mb-6 text-center">Your Orders</h1>

            <div className="flex flex-row gap-x-3 items-center justify-center mb-3">
                <p className="text-slate-100 text-center text-md">Choose order type</p>
                <SelectOrderType orderType={orderType} handleOrderTypeChannge={setOrderType} />
            </div>

            {removeError && (
                <div className="text-red-500 text-center mb-4">{removeError}</div>
            )}

            {orders.length === 0 ? (
                <p className="text-center text-white">
                    No {orderType.toLowerCase()} orders found.
                </p>
            ) : (
                orders.map((order: Order, index: number) => (
                    <div key={order.orderID} className="mb-10 p-4 rounded-2xl shadow-lg bg-bg-lighter">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-white text-xl mb-2 font-semibold">
                                Order #{index + 1}
                            </h2>

                            {orderType === "pending" &&
                                (<RemoveButton onClick={() => handleRemoveOrder(order.orderID)} loading={removeLoading} />)}
                        </div>

                        <p className="text-slate-100 text-sm mb-4">
                            Created: {new Date(order.createdAt).toLocaleString()}
                        </p>

                        <DisplayBookList books={order.books} />
                    </div>
                ))
            )}
        </div>
    );
};

export default OrdersPage;