import { useState } from "react";
import TabHeader from "./components/TabHeader";
import LoginBody from "./components/LoginBody";

const Login = () => {
  const [activeTab, setActiveTab] = useState('seeker-tab');

  return (
    <div>
      <TabHeader activeTab={activeTab} setActiveTab={setActiveTab}/>
      <LoginBody activeTab={activeTab}></LoginBody>
    </div>
  );
}
 
export default Login;