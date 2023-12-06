import Header from "./Header";
import Footer from "./Footer";
import { getUser, isLogged } from "../utils/credential";
import { useNavigate } from "react-router";
import { useState } from "react";

const PageFrame = ({requiredLogin, requiredUserType, children}) => {
    const userInfo = getUser();
    const navigate = useNavigate();
    const [log, setLog] = useState(isLogged());

    const logout = () => {
        setLog(false);
    }

    if (requiredLogin && !isLogged()) {
        navigate('/auth/login');
    }

    if (requiredUserType && userInfo.userType !== requiredUserType) {
        navigate('/')
    }

    return ( 
        <>
        <Header userType={userInfo.userType} username={userInfo.username} logout={logout}/>
        <main className="mt-0 bg-background">
            {children}
        </main>
        <Footer userType={userInfo.userType}/>
        </>
    );
}
 
export default PageFrame;