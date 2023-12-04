import { useState } from "react";
import { Link } from "react-router-dom";

import {EmailField, PasswordField, ErrorDisplay} from "./FormFields";

const LoginTitle = ({activeTab}) => {
    const message = () => {
        if (activeTab === "seeker-tab") {
            return " Pet Seeker ";
        }
        else {
            return " Pet Shelter ";
        }
    }

    return ( 
    <div className="font-medium text-lg mb-4"> Log in to your 
    <span className="font-semibold">{message()}</span> account</div> 
    );
}

const RememberAndResetPassword = ({rememberMe, setRememberMe}) => (
    <div className="my-4 flex justify-between items-center">
        <div className="flex items-center gap-1">
            <input type="checkbox" checked={rememberMe} 
            onChange={() => {setRememberMe(!rememberMe); console.log(rememberMe)}}/> 
            <label className="text-sm" onClick={() => {setRememberMe(!rememberMe);}}>Remember me</label>
        </div>
        {/* <Link className="text-sm hover:underline"> Forgot Password?</Link> */}
    </div>
);

const SignupLink = () => (
    <div className="mt-3">
        <span className="text-sm mr-1">Don't have an account yet?</span>
        <Link to="../signup" className="text-sm hover:underline">Sign up</Link>
    </div>
);

const LoginBody = ({activeTab}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <div className="z-10 flex justify-center items-center w-full -mt-px">
            <form className="flex mx-3 w-full max-w-[540px] bg-background flex-col px-4 py-4 rounded-b-lg">
                <LoginTitle activeTab={activeTab}/>
                <EmailField email={email} setEmail={setEmail}/>
                <PasswordField password={password} setPassword={setPassword}/>
                <RememberAndResetPassword rememberMe={rememberMe} setRememberMe={setRememberMe}/>
                <ErrorDisplay error={error} setError={setError}/>   
                
        
                <button className="bg-primary text-white rounded-md py-1 
                hover:shadow-md hover:bg-[#744124]">
                    Log in
                </button>
                <SignupLink/>
            </form>
        </div>
    );
}
 
export default LoginBody;
