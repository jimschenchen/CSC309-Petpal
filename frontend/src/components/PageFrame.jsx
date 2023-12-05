import Header from "./Header";
import Footer from "./Footer";

const PageFrame = ({userType, username, children}) => {
    return ( 
        <>
        <Header userType={userType} username={username}/>
        <main className="mt-0 bg-background">
            {children}
        </main>
        <Footer userType={userType}/>
        </>
    );
}
 
export default PageFrame;