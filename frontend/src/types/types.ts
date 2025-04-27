export type ItemProps = {
    id: number;
    imgPath: string;
    name: string;
    price: number;
    prevPrice?: number | null;
    rating: number;
}
export type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'user';
}
