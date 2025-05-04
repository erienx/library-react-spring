import { useEffect, useState } from "react";

type useFetchCategoriesType = {
    endpointType: string;
}

const useFetchCategories = ({ endpointType }: useFetchCategoriesType) => {
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
                setItems(data);
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
export default useFetchCategories;