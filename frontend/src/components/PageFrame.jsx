import Header from "./Header";
import Footer from "./Footer";
import { getUser, isLogged } from "../utils/credential";
import { Navigate } from "react-router";

const PageFrame = ({requiredLogin, requiredUserType, children}) => {
    const userInfo = getUser();
    return ( 
        <>
        {requiredLogin && !isLogged() && <Navigate to="auth/login"/>}
        {requiredUserType && userInfo.userType !== requiredUserType && <Navigate to='/'/>}
        <Header userType={userInfo.userType} username={userInfo.username}/>
        <main className="mt-0 bg-background">
            {children}
        </main>
        <Footer userType={userInfo.userType}/>
        </>
    );
}
 
export default PageFrame;