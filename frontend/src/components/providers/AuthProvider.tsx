import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { User } from "../../types/types";
import { getUser, login, logout } from "../../util/auth";

type AuthContext = {
    authToken?: string | null;
    currentUser?: User | null;
    handleLogin: () => Promise<void>;
    handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({children} : AuthProviderProps) {
    const [authToken, setAuthToken] = useState<string | null>();
    const [currentUser, setCurrentUser] = useState<User | null>();

    useEffect(()=>{
        async function fetchUser() {
            try{
                const response = await getUser();
                
                const {authToken, user} = response.data;
    
                setAuthToken(authToken);
                setCurrentUser(user);
            }catch{
                setAuthToken(null);
                setCurrentUser(null);
            }
        }
 
        fetchUser();
    }, [])

    async function handleLogin() {
        try{
            const response = await login();
            
            const {authToken, user} = response.data;

            setAuthToken(authToken);
            setCurrentUser(user);
        }catch{
            setAuthToken(null);
            setCurrentUser(null);
        }
    }
    async function handleLogout(){
        await logout();

        setAuthToken(null);
        setCurrentUser(null);
    }

    return <AuthContext.Provider value={{authToken,currentUser,handleLogin,handleLogout}}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined){
        throw new Error("useAuth should be used inside of auth provider");
    }
    return context; 
}