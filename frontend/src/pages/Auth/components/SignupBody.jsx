import { useState } from "react";
import { Link } from "react-router-dom";

import {EmailField, PasswordField, ErrorDisplay} from "./FormFields";

const SignupTitle = ({activeTab}) => {
    const message = () => {
        if (activeTab === "seeker-tab") {
            return " Pet Seeker ";
        }
        else {
            return " Pet Shelter ";
        }
    }
    return ( 
    <div className="font-medium text-lg mb-4"> Create a 
    <span className="font-semibold">{message()}</span> account</div> 
    );
}

const Password2Field = ({password2, setPassword2}) => {
    return (
        <div className="my-1 flex flex-col">
            <label className="text-sm mb-1 px-1 py-1">Confirm password</label>
            <input type="password" className="px-1 py-1 rounded-sm
            focus:ring-primary focus:outline-none focus:ring-1" value={password2}
            onChange={(event) => {setPassword2(event.target.value)}}/>
        </div>
    );
}

const LoginLink = () => (
    <div className="mt-3">
        <span className="text-sm mr-1">Already have an account?</span>
        <Link to="../login" className="text-sm hover:underline">Log in</Link>
    </div>
)

const SignupBody = ({activeTab}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');

    const validate_info = () => {
        // check email
        const email_pattern = /^[a-z0-9+\-*!%]+(\.[a-z+\-*!%]+)*@[a-z0-9+\-*!%]+(\.[a-z+\-*!%]+)*\.[a-z]{2,4}$/i;
        if (!email_pattern.test(email)) {
            setError("Email is not valid");
            return;
        }

        // check password
        const passowrd_pattern = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/;
        if (password.length < 8) {
            setError("Password should have at least 8 characters");
            return;
        }
        if (!passowrd_pattern.test(password)) {
            setError("Password should have at least one lower case letter, one upper case letter and one special character.")
            return;
        }

        // check repeat password 
        if (password2 !== password) {
            setError("Passwords don't match");
            return ;
        }

        console.log("ok");
    }

    return ( 
        <div className="z-10 flex justify-center items-center w-full -mt-px">
            <form className="flex mx-3 w-full max-w-[540px] bg-background flex-col px-4 py-4 rounded-b-lg">
                <SignupTitle activeTab={activeTab}/>
                <EmailField email={email} setEmail={setEmail}/>
                <PasswordField password={password} setPassword={setPassword}/>
                <Password2Field password2={password2} setPassword2={setPassword2}/>
                <ErrorDisplay error={error}/>   
                
        
                <button 
                className="bg-primary text-white rounded-md py-1 
                hover:shadow-md hover:bg-[#744124]"
                onClick={(e) => {e.preventDefault(); validate_info()}}>
                    Sign up
                </button>
                <LoginLink/>
            </form>
        </div>
    );
}
 
export default SignupBody;