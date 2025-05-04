import { PropsWithChildren, useEffect, useState } from "react";
import { User } from "../../types/types";
import { getUser, login, logout } from "../../util/auth";
import { AuthContext } from "./AuthContext";



type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
    const [authToken, setAuthToken] = useState<string | null>();
    const [currentUser, setCurrentUser] = useState<User | null>();

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await getUser();

                const { authToken, user } = response.data;

                setAuthToken(authToken);
                setCurrentUser(user);
            } catch {
                setAuthToken(null);
                setCurrentUser(null);
            }
        }

        fetchUser();
    }, [])

    async function handleLogin() {
        try {
            const response = await login();

            const { authToken, user } = response.data;

            setAuthToken(authToken);
            setCurrentUser(user);
        } catch {
            setAuthToken(null);
            setCurrentUser(null);
        }
    }
    async function handleLogout() {
        await logout();

        setAuthToken(null);
        setCurrentUser(null);
    }

    return <AuthContext.Provider value={{ authToken, currentUser, handleLogin, handleLogout }}>
        {children}
    </AuthContext.Provider>
}

