export const useUploadBook = async (bookData: any) => {
    try {
      const response = await fetch('http://localhost:8080/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(bookData),
      });
  
      if (!response.ok) {
        throw new Error('failed to upload book');
      }
  
      const result = await response.json();
      console.log('book uploaded successfully:', result);
    } catch (error) {
      console.error('error uploading book:', error);
    }
  };
  