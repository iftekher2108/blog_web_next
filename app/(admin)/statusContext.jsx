'use client';
import { createContext, useContext, useState, useCallback } from "react";

const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    return(
        <StatusContext.Provider value={{ message, setMessage }} >
            { children }
        </StatusContext.Provider>
    )
}

export const useMessage = () => {
    return useContext(StatusContext);
}