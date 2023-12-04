import Header from "./Header";
import Footer from "./Footer";

const PageFrame = ({userType, username, children}) => {
    return ( 
        <>
        <Header userType={userType} username={username}/>
        <main className="h-full mt-0 pt-14 sm:pt-16 pb-14 bg-background">
            {children}
        </main>
        <Footer userType={userType}/>
        </>
    );
}
 
export default PageFrame;