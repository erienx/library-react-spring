import uploadBook from "../../hooks/api/uploadBook";

const fetchBooks = async (value: string = "") => {
  const url = value
    ? `https://openlibrary.org/search.json?title=${encodeURIComponent(value)}`
    : "https://openlibrary.org/trending/weekly.json";

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Books fetch failed.");
    }

    const data = await res.json();
    const books = value ? data.docs : data.works;
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

const randomFloat = (min: number, max: number) => {
  return (Math.random() * (max - min) + min).toFixed(1);
};

const getRandomItem = (arr: string[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const uploadAllBooks = async () => {
  const publisherList = [
    "Penguin Random House",
    "HarperCollins",
    "Simon & Schuster",
    "Hachette Book Group",
    "Macmillan Publishers",
    "Scholastic",
    "Oxford University Press"
  ];

  const categoryList = [
    "Fantasy",
    "Science Fiction",
    "Romance",
    "Mystery",
    "Historical",
    "Young Adult",
    "Thriller"
  ];

  const books = await fetchBooks("");

  for (const book of books) {
    const bookData = {
      title: book.title,
      publicationYear: book.first_publish_year || 0,
      author: book.author_name ? book.author_name[0] : "Unknown",
      pathToCover: book.cover_edition_key
        ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`
        : "",
      pages: Math.floor(Math.random() * 800 + 300),
      rentedCount: Math.floor(Math.random() * 200),
      rating: parseFloat(randomFloat(3.5, 5)),
      publisher: getRandomItem(publisherList),
      category: getRandomItem(categoryList),
    };

    await uploadBook(bookData);
  }
};

uploadAllBooks();
