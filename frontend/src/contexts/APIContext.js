import { useState } from "react";
import { createContext } from "react";

export const APIContext = createContext({
    sidebarVisible: false,
    setSidebarVisible: () => {},
    filters: {
        age: 'Any',
        breed: 'Any',
        size: 'Any',
        gender: 'Any',
        sort: 'Any',
        name: 'Any',
    },
    setFilters: () => {}
});

export const useAPIContext = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [filters, setFilters] = useState({
        age: 'Any',
        breed: 'Any',
        size: 'Any',
        gender: 'Any',
        sort: 'Any',
        name: 'Any',
    });

    return {
        sidebarVisible, setSidebarVisible,
        filters, setFilters,
    };
}
