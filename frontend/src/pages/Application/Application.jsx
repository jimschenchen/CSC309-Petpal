import PageFrame from "../../components/PageFrame";


const Application = () => {

    const userType = 'seeker';
    const username = 'User';

    return ( 
        <PageFrame userType={userType} username={username}>
            <div>Some content</div>
            <div>Some other content</div>
        </PageFrame>
    );
}
 
export default Application;