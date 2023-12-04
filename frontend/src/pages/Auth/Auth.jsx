import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthLogo from "./components/logo";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
    useEffect(() => {
        document.body.classList.add("bg-sencond_background");
    })
    return ( 
        <div>
            <AuthLogo/>
            <Routes>
                <Route index element={<Login/>}/>
                <Route path="login" element={<Login/>} />
                <Route path="signup" element={<Signup/>} />
                <Route path="*" element={<Navigate to="login"/>}/>
            </Routes>
        </div>
        
    );

}
 
export default Auth;