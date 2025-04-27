import { ItemProps } from "../types/types";

export const getItems = () => {
    const items: ItemProps[] = [
        {
            id: 1,
            imgPath: './temp/smartwatch.jpg',
            name: 'Smartwatch',
            price: 199.99,
            prevPrice: 229.99,
            rating: 4.5,
        },
        {
            id: 2,
            imgPath: './temp/monitor.jpg',
            name: '24" Monitor',
            price: 299.99,
            prevPrice: null,
            rating: 4.7,
        },
        {
            id: 3,
            imgPath: './temp/speaker.jpg',
            name: 'Bluetooth Speaker',
            price: 59.99,
            prevPrice: 79.99,
            rating: 4.2,
        },
        {
            id: 4,
            imgPath: './temp/smartwatch.jpg',
            name: 'Smartwatch',
            price: 199.99,
            prevPrice: 229.99,
            rating: 4.5,
        },
        {
            id: 5,
            imgPath: './temp/monitor.jpg',
            name: '24" Monitor',
            price: 299.99,
            prevPrice: null,
            rating: 4.7,
        },
        {
            id: 6,
            imgPath: './temp/speaker.jpg',
            name: 'Bluetooth Speaker',
            price: 59.99,
            prevPrice: 79.99,
            rating: 4.2,
        },
        {
            id: 7,
            imgPath: './temp/smartwatch.jpg',
            name: 'Smartwatch',
            price: 199.99,
            prevPrice: 229.99,
            rating: 4.5,
        },
        {
            id: 8,
            imgPath: './temp/monitor.jpg',
            name: '24" Monitor',
            price: 299.99,
            prevPrice: null,
            rating: 4.7,
        },
        {
            id: 9,
            imgPath: './temp/speaker.jpg',
            name: 'Bluetooth Speaker',
            price: 59.99,
            prevPrice: 79.99,
            rating: 4.2,
        },

    ];
    return items;
} 