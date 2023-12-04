import { useState } from "react";

import SignupBody from "./components/SignupBody";
import TabHeader from "./components/TabHeader";

const Signup = () => {
    const [activeTab, setActiveTab] = useState('seeker-tab');

    return (
        <div>
            <TabHeader activeTab={activeTab} setActiveTab={setActiveTab}/>
            <SignupBody activeTab={activeTab}></SignupBody>
        </div>
    );
}
 
export default Signup;