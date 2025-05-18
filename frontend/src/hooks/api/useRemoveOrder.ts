import { useState } from 'react';

type UseRemoveOrderResult ={
  removeOrder: (orderId: number) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

const useRemoveOrder = (memberId: number | undefined, token: string | undefined | null): UseRemoveOrderResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const removeOrder = async (orderId: number): Promise<boolean> => {
    if (!memberId || !token) {
      setError('User not authenticated');
      return false;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:8080/orders/${orderId}?memberId=${memberId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `failed to remove order (${response.status})`);
      }
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'unknown error ';
      setError(errorMessage);
      console.error('error removing order:', errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return { removeOrder, loading, error };
};

export default useRemoveOrder;