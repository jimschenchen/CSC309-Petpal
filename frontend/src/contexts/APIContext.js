import { useState } from "react";
import { createContext } from "react";

export const APIContext = createContext({
    sidebarVisible: false,
    setSidebarVisible: () => {},
});

export const useAPIContext = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    return {
        sidebarVisible, setSidebarVisible,
    };
}