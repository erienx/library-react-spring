import { Outlet } from "react-router-dom";
import AuthHeader from "../components/header/AuthHeader";

const AuthLayout = () => (

    <div className="min-h-screen flex flex-col items-center bg-bg p-4">
        <AuthHeader />
        <Outlet />
    </div>
);
export default AuthLayout