import { useEffect, useState } from "react";
import { Order } from "../../types/types";

const useFetchOrders = ( memberId: number | undefined, token: string | undefined | null, orderType: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    if (!memberId || !token || !orderType) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/orders?memberId=${memberId}&status=${orderType}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data: Order[] = await res.json();
      setOrders(data);
    } catch (err) {
      setErrorMsg("Failed to load orders");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [memberId, token, orderType]);

  return { orders, errorMsg, loading, refetch: fetchData };
};

export default useFetchOrders;