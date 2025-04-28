export type Publisher = {
    publisherID: number;
    publisherName: string;
};

export type Category = {
    categoryID: number;
    categoryName: string;
};

export type Author = {
    authorID: number;
    authorName: string;
};

export type Book = {
    bookID: number;
    title: string;
    publicationYear: number;
    rating: number;
    addedDate: string;
    pages: number;
    pathToCover: string;
    rentedCount: number;
    publisher: Publisher;
    category: Category;
    author: Author;
    bookCopies?: any;
};

export type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'user';
}
