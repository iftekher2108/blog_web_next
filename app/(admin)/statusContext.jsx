'use client';
import { createContext, useContext, useState, useCallback } from "react";

const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
    const [message, setMessage] = useState(null);

    // const showMessage = useCallback((msg, duration = 3000) => {
    //     setMessage(msg);

    //     // duration পেরোলেই null করে দেবে
    //     setTimeout(() => {
    //         setMessage(null);
    //     }, duration);
    // }, []);

    return(
        <StatusContext.Provider value={{ message, setMessage }} >
            { children }
        </StatusContext.Provider>
    )
}

export const useMessage = () => {
    return useContext(StatusContext);
}