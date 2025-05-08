export const checkBookInCart = async (
  memberId: number,
  bookId: number,
  authToken: string | null | undefined,
): Promise<boolean> => {
  const response = await fetch(
    `http://localhost:8080/carts/items/contains?memberId=${memberId}&bookId=${bookId}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  if (!response.ok) throw new Error("Failed to check cart status");

  return response.json();
};
