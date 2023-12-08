import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthLogo from "./components/logo";
import Login from "./Login";
import Signup from "./Signup";
import ResetPasswordConfirm from "./ResetPasswordConfirm";
import ResetPassword from "./ResetPassword";

const Auth = () => {
    return ( 
        <div className="w-full h-full bg-sencond_background">
            <AuthLogo/>
            <Routes>
                <Route path="login" element={<Login/>} />
                <Route path="signup" element={<Signup/>} />
                <Route path="reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>}></Route>
                <Route path='reset/password' element={<ResetPassword/>}></Route>
                <Route path="*" element={<Navigate to="login"/>}/>
            </Routes>
        </div>
        
    );

}
 
export default Auth;