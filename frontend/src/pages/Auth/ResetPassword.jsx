import { EmailField, ErrorDisplay } from "./components/FormFields";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { getUser, removeUser } from "../../utils/credential";

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        removeUser();
    }, []);

    const handleEmailConfirm = () => {
        // check is email valid
        setIsLoading(true);
        fetch("https://petpal.api.jimschenchen.com/auth/users/reset_password/", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email})
        }).then(res => {
            if (!res.ok) {
                throw Error(res.status);
            }
            setIsLoading(false);
            setSuccess(true);
        }).catch(err => {
            if (err.message == 400) {
                setError('This email is not signed up. Please signup with this email instead.')
                setIsLoading(false);
            }
        })
    }

    return (
        <div className="mt-10 z-10 flex justify-center items-center w-full">
        
        <form className="flex w-full max-w-[540px] bg-background flex-col p-2 rounded-lg">
        {success &&
        <><div className="font-medium text-lg mb-4"> Forgot Your Password?</div>
        <div className="font-normal text-base mb-4"> Password reset instructions is sent to your email. </div></>}
        
        {!success && <><div className="font-medium text-lg mb-4"> Forgot Your Password?</div>
        
        <div className="font-normal text-base mb-4"> To reset your password, please enter your email below. Password reset instructions will be sent to the email address associated with your account. </div>

        <EmailField email={email} setEmail={setEmail}></EmailField>
    
        <ErrorDisplay error={error} setError={setError}/>   
        <button className="bg-primary text-white rounded-md py-1 
            hover:shadow-md hover:bg-[#744124] h-8 mt-4"
            onClick={(e) => {e.preventDefault(); handleEmailConfirm();}}>
                {isLoading? <CircularProgress color="inherit" size="1.5rem"/>: "Confirm"}
            </button></>}
        
        <div className="mt-3">
        <Link to='../login' className="text-sm hover:underline">Continue to log in</Link>
        </div>
        </form>

        

    </div>
    );
}
 
export default ResetPassword;