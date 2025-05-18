import { useEffect, useState } from "react"
import Search from "../../components/ui/Search"
import SelectOrderType from "../../components/ui/SelectOrderType";
import { useAuth } from "../../components/providers/AuthContext";
import { Order } from "../../types/types";
import DisplayBookList from "../../components/DisplayBookList";
import useDebounce from "../../hooks/useDebounce";
import useForwardOrder from "../../hooks/api/useForwardOrder";
import useFetchMembersByFields from "../../hooks/api/useFetchMemberIdByFields";
import useFetchOrders from "../../hooks/api/useFetchOrders";

const ManageRentalsPage = () => {
    const { currentUser, authToken, loading: userLoading } = useAuth();
    const [orderType, setOrderType] = useState<string>("pending");
    const [emailSearch, setEmailSearch] = useState("");
    const [firstNameSearch, setFirstNameSearch] = useState("");
    const [lastNameSearch, setLastNameSearch] = useState("");
    const [memberId, setMemberId] = useState<number | null>(null);

    const { forwardOrder, loading: forwardLoading } = useForwardOrder(currentUser?.memberId, authToken);
    const { orders, loading: ordersLoading, refetch } = useFetchOrders(memberId, authToken, orderType);

    const debouncedEmailSearch = useDebounce(emailSearch, 1000);
    const debouncedFirstNameSearch = useDebounce(firstNameSearch, 1000);
    const debouncedLastNameSearch = useDebounce(lastNameSearch, 1000);

    const { members, loading: membersLoading } = useFetchMembersByFields(authToken, orderType, debouncedEmailSearch, debouncedFirstNameSearch, debouncedLastNameSearch);




    const handleForwardOrder = async (orderID: number) => {
        await forwardOrder(orderID);
        refetch();
    }
    const handleMemberClick = (memberId: number) => {
        setMemberId(memberId);
        setEmailSearch("");
        setFirstNameSearch("");
        setLastNameSearch("");
    }

    if (userLoading || ordersLoading) {
        return <div className="text-white text-center mt-10 text-xl">Loading your orders...</div>;
    }

    if (!currentUser) {
        return <div className="text-white text-center mt-10 text-xl">Please log in to view your orders</div>;
    }

    return (
        <div className='flex flex-col items-center justify-center gap-y-5'>
            <h2 className="text-4xl text-white font-semibold">Search for user's orders</h2>

            <div className='flex flex-col items-center justify-center max-w-4xl w-full rounded-xl bg-bg-lighter/70 p-5'>
                <Search placeholder="Search by email" searchInp={emailSearch} setSearchInp={setEmailSearch} />
                <p className="text-slate-200 text-xl">and/or</p>
                <Search placeholder="Search by first name" searchInp={firstNameSearch} setSearchInp={setFirstNameSearch} />
                <p className="text-slate-200 text-xl">and/or</p>
                <Search placeholder="Search by last name" searchInp={lastNameSearch} setSearchInp={setLastNameSearch} />
            </div>

            {(debouncedEmailSearch || debouncedFirstNameSearch || debouncedLastNameSearch) && (
                <div className="flex flex-col gap-y-3 items-center justify-center">
                    {members.length > 0 ? (
                        <>
                            <h3 className="text-white text-2xl font-semibold">Members found</h3>
                            {members.map((member) => (
                                <div key={member.memberId} className="cursor-pointer rounded-xl bg-bg-lighter px-4 py-2 text-white hover:bg-bg-dark" onClick={() => handleMemberClick(member.memberId)} >
                                    <p>{member.firstName} {member.lastName}</p>
                                </div>
                            ))}
                        </>
                    ) : (
                        <h3 className="text-white text-2xl font-semibold">No members found</h3>
                    )}
                </div>
            )}

            <div className="flex flex-row gap-x-3 items-center justify-center mb-3">
                <p className="text-slate-100 text-center text-md">Choose order type</p>
                <SelectOrderType orderType={orderType} handleOrderTypeChannge={setOrderType} />
            </div>

            {orders.length === 0 ? (
                memberId && (
                    <p className="text-center text-white">
                        No {orderType.toLowerCase()} orders found.
                    </p>
                )
            ) : (
                orders.map((order: Order, index: number) => (
                    <div key={order.orderID} className="mb-10 p-4 rounded-2xl shadow-lg bg-bg-lighter">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-white text-xl mb-2 font-semibold">
                                Order #{index + 1}
                            </h2>

                            {orderType !== "completed" && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        handleForwardOrder(order.orderID);
                                    }}
                                    disabled={forwardLoading}
                                    className="cursor-pointer px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold shadow filter saturate-80"
                                >
                                    {forwardLoading ? "Forwarding..." : "Forward"}
                                </button>
                            )}
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

export default ManageRentalsPage;