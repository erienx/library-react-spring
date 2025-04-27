import { useParams } from "react-router-dom"

export const ItemPage = () => {
    const params = useParams<{query: string}>();

    return (
    <div>ItemPage, id: {params.query}</div>
    )
}
