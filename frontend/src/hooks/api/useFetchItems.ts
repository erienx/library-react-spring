import { useEffect, useState } from "react";

type useFetchItemsType = {
    endpointType: "categories" | "authors" | "publishers";
}

const useFetchItems = ({ endpointType }: useFetchItemsType) => {
    const [items, setItems] = useState<string[]>([]);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:8080/${endpointType}`

                const res = await fetch(url);
                if (!res.ok) {
                    setErrorMsg("Item fetch failed");
                    setItems([]);
                    return;
                }

                const data = await res.json();
                if (!data) {
                    setErrorMsg("No items found");
                    setItems([]);
                    return;
                }

                const keyMap = {
                    categories: "categoryName",
                    authors: "authorName",
                    publishers: "publisherName",
                } as const;

                const key = keyMap[endpointType];

                const names = data.map((item: Record<string, string>) => item[key]);

                setItems(names);
                setErrorMsg('');
            }
            catch {
                setErrorMsg("Error fetching books.");
                setItems([]);
            }

        }
        fetchData();
    }, [endpointType]);

    return { items, errorMsg };
}
export default useFetchItems;