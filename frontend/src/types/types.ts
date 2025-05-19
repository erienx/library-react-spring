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
    memberId: number;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'user';
}
export type Order = {
    orderID: number;
    createdAt: string;
    books: Book[];
};

export type FieldDefinition = {
  name: string;
  type: string;
  label: string;
  required: boolean;
  validation?: Record<string, any>;
  icon:string;
};