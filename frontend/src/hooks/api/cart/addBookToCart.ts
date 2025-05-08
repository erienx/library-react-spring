export const addBookToCart = async (
    memberId: number,
    bookId: number,
    authToken: string | null | undefined,
  ): Promise<void> => {
    const response = await fetch("http://localhost:8080/carts/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ memberId, bookId }),
      credentials: "include",
    });
  
    if (!response.ok) throw new Error("Failed to add to cart");
  };
  