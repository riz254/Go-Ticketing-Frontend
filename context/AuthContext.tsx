import { userService } from "@/services/user";
import { User } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

// define authentication context props
interface AuthContextProps {
    isLoggedIn: boolean;
    isLoadingAuth: boolean;
    authenticate: (authMode: "login" | "register", email: string, password: string) => Promise<void>;
    logout: VoidFunction;
    user: User | null;
}

const AuthContext = createContext({} as AuthContextProps);

// create custom useAuth hook
export function useAuth() {
    return useContext(AuthContext);
}

// provide authentication context to children
export function AuthenticationProvider({ children }: PropsWithChildren) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // check if user is logged in
        async function checkIfLoggedIn() {
            const token = await AsyncStorage.getItem("token");
            const user = await AsyncStorage.getItem("user");

            if (token && user) {
                setUser(JSON.parse(user));
                setIsLoggedIn(true);
                router.replace("/(authed)")
            } else {
                setIsLoggedIn(false);
            }
        }

        checkIfLoggedIn();
    }, []);

    // authenticate user    
    async function authenticate(authMode: "login" | "register", email: string, password: string): Promise<void> {


        try {
            setIsLoadingAuth(true);

            const response = await userService[authMode]({ email, password });

            if (response) {
                const { data } = response;
                const { user, token } = data;

                await AsyncStorage.setItem("token", token);
                await AsyncStorage.setItem("user", JSON.stringify(user));
                setUser(user);

                router.replace("/(authed)");
                setIsLoggedIn(true);
            }

        } catch (error) {
            setIsLoadingAuth(false);
        } finally {
            setIsLoadingAuth(false);
        }
    }

    // logout user
    async function logout() {
        setIsLoggedIn(false);

        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        setUser(null);
    }

    // provide context to children
    return (
        <AuthContext.Provider
            value={
                {
                    isLoadingAuth,
                    isLoggedIn,
                    authenticate,
                    user,
                    logout
                }
            }
        >
            {children}
        </AuthContext.Provider>
    );
}