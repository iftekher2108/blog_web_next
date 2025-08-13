'use client'
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    // Load user from localStorage (or cookie) on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem("user");
            if (userData) {
                setUser(JSON.parse(userData));
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);