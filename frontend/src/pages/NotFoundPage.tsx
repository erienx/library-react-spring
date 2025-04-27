import { Link } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <div className="flex flex-col gap-3 justify-center items-center m-4">
            <p className="text-4xl">404 Not Found</p>
            <Link className="text-4xl border-1 p-5 rounded-2xl font-semibold" to="/">Take Me Back Home</Link>
        </div>
    )
}

export default NotFoundPage