import { useState } from "react";
import PageFrame from "../../components/PageFrame";
import TabHeader from "./components/TabHeader";
import ApplicationBody from "./components/ApplicationBody";
import MessageBody from "./components/MessageBody";

const TabBody = ({activeTab}) => {
    if (activeTab === 'msg-tab') {
        return <MessageBody/>
    }
    else {
        return <ApplicationBody/>
    }
}

const Application = () => {
    const userType = 'seeker';
    const username = 'User';
    const [activeTab, setActiveTab] = useState('msg-tab');

    return ( 
        <PageFrame userType={userType} username={username}>
            <div className="h-full w-full flex items-center justify-center">
                <div className="max-w-[800px] w-full flex flex-col items-center">
                    <TabHeader activeTab={activeTab} setActiveTab={setActiveTab}/>
                    <TabBody activeTab={activeTab}/>
                </div>
            </div>
            
        </PageFrame>
    );
}
 
export default Application;