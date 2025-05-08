import { createContext, useContext } from "react";
import { User } from "../../types/types";

type AuthContext = {
    authToken?: string | null;
    currentUser?: User | null;
    handleLogin: (email: string, password: string) => Promise<void>;
    handleLogout: () => Promise<void>;
    loading: boolean;
  };

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth should be used inside of auth provider");
    }
    return context;
}
