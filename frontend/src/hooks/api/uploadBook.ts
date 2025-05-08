type uploadBookProps = {
  title: string;
  publicationYear: number;
  author: string;
  pathToCover?: string;
  pages: number;
  rentedCount: number;
  rating: number;
  publisher: string;
  category: string;
  copyCount: number;
}

async function uploadBook(data: uploadBookProps): Promise<string> {
  try {
    const response = await fetch('http://localhost:8080/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('failed to upload book');
    }

    const result = await response.json();
    console.log('book uploaded successfully:', result);

    return result.id || 'Upload successful';
  } catch (error) {
    console.error('error uploading book:', error);
    throw error;
  }
}

export default uploadBook;