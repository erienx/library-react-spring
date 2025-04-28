import { Outlet } from "react-router-dom";

const AuthLayout = () => (

    <div className="min-h-screen flex flex-col items-center bg-bg p-4">
        <div className="mb-4 self-start">
            {/* <Link to="/" className="text-accent1 hover:underline text-sm">
                ← Back to Home
            </Link> */}
        </div>
        <Outlet />
    </div>
);
export default AuthLayout