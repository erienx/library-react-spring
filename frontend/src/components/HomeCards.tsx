import { useState } from "react";
import { ItemProps } from "../types/types"
import { getItems } from "../util/getSampleItems";
import ItemCard from "./ItemCard";
import Button1 from "./ui/Button1";
import CategorySelector from "./ui/CategorySelector";

const AllCards = () => {
    const LOAD_ADDITIVE = 4;
    const [visibleItemCount, setVisibleItemCount] = useState(LOAD_ADDITIVE);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const items: ItemProps[] = getItems();
    const hasMoreItems: boolean = visibleItemCount < items.length;

    const handleLoadMore = () => {
        const value = visibleItemCount + LOAD_ADDITIVE > items.length ?
            items.length : visibleItemCount + LOAD_ADDITIVE;
        setVisibleItemCount(value);
    }

    return (
        <section className="spacey-y-9 my-4 mb-6 mx-20">
            <h2 className="text-center font-medium text-dark text-shadow-2xs">BEST SELLER</h2>
            <CategorySelector category={selectedCategory} setCategory={setSelectedCategory} />
            <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {items.slice(0, visibleItemCount).map((item, index) => (
                    <li
                        key={item.id}
                        className="opacity-0 animate-fade-in-up"
                        style={{ animationDelay: `${index % 4 * 35 + 50}ms`, animationFillMode: 'forwards' }}
                    >
                        <ItemCard item={item} />
                    </li>
                ))}
            </ul>
            <p className="text-center text-dark mt-4">{visibleItemCount} items displayed</p>

            {hasMoreItems && <Button1 onClick={handleLoadMore} text="load more" />}
        </section>
    )
}

export default AllCards