import { PropsWithChildren, useEffect, useState } from "react";
import { User } from "../../types/types";
import { login, logout, refreshToken } from "../../util/auth";
import { AuthContext } from "./AuthContext";
import getMe from "../../hooks/api/getMe";



type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function tryRefresh() {
            try {
                const accessToken = await refreshToken();
                setAuthToken(accessToken);
                const user = await getMe(accessToken);
                setCurrentUser(user);
            } catch (err) {
                setAuthToken(null);
                setCurrentUser(null);
            }
            finally {
                setLoading(false);
            }
        }

        tryRefresh();
    }, []);

    async function handleLogin(email: string, password: string) {
        try {
            const accessToken = await login(email, password);
            setAuthToken(accessToken);
            const user = await getMe(accessToken);
            setCurrentUser(user);
        } catch {
            setAuthToken(null);
            setCurrentUser(null);
            throw new Error("Login failed");
        }
    }

    async function handleLogout() {
        await logout();
        setAuthToken(null);
        setCurrentUser(null);
    }

    return (
        <AuthContext.Provider value={{ authToken, currentUser, handleLogin, handleLogout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

