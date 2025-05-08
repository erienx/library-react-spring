type CopyCountResponse =  {
    availableCopies: number,
    totalCopies: number,
  }
  
  export const fetchBookCopies = async (bookId: number): Promise<CopyCountResponse> => {
    const response = await fetch(`http://localhost:8080/books/${bookId}/copies`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch copy count");
    }
  
    return response.json();
  };