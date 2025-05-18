import { useState } from 'react';

type useForwardOrderProps ={
  forwardOrder: (orderId: number) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

const useForwardOrder = (memberId: number | undefined, token: string | undefined | null) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forwardOrder = async (orderId: number): Promise<boolean> => {
    if (!memberId || !token) {
      setError("User not authenticated");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:8080/orders/${orderId}/forward`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `Failed to forward order (${res.status})`);
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error forwarding order:", errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { forwardOrder, loading, error };
};

export default useForwardOrder;
