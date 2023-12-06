import Header from "./Header";
import Footer from "./Footer";
import { getUser } from "../utils/credential";

const PageFrame = ({children}) => {
    const userInfo = getUser();
    return ( 
        <>
        <Header userType={userInfo.userType} username={userInfo.username}/>
        <main className="mt-0 bg-background">
            {children}
        </main>
        <Footer userType={userInfo.userType}/>
        </>
    );
}
 
export default PageFrame;