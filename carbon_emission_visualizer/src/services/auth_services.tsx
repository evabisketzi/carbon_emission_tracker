// Implementation taken from
// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03?utm_source=reactdigest&utm_medium&utm_campaign=1655
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState, type JSX } from "react";

const AuthContext = createContext<{ token: string | null; setToken: (token: string) => void }>({
    token: null,
    setToken: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [token, setToken_] = useState(localStorage.getItem("token"));
    const setToken = (newToken: string) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token');
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token]
    );

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};