import { useState } from "react";
import { createContext } from "react";

export const APIContext = createContext({
    userName: "jack",
    setUserName: () => {},
});

export const useAPIContext = () => {
    const [userName, setUserName] = useState("jack");

    return {
        userName, setUserName,
    };
}