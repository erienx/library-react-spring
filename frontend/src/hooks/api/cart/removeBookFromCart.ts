export const removeBookFromCart = async (
    memberId: number,
    bookId: number,
    authToken: string | null | undefined,
  ): Promise<void> => {
    const response = await fetch(
      `http://localhost:8080/carts/items?memberId=${memberId}&bookId=${bookId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  
    if (!response.ok) throw new Error("Failed to remove from cart");
  };
  