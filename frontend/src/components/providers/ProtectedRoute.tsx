import { PropsWithChildren } from "react";
import { User } from "../../types/types";
import { useAuth } from "./AuthProvider";

type ProtectedRouteProps = PropsWithChildren & {
    allowedRoles?: User['role'][];
}

export default function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
    const { currentUser } = useAuth();

    if (currentUser === undefined) {
        return <div className="flex justify-center items-center text-4xl">Loading...</div>
    }
    if (currentUser === null || (allowedRoles && !allowedRoles.includes(currentUser.role))) {
        return <div className="flex justify-center items-center text-4xl">Permission denied</div>;
    }

    return children;
}