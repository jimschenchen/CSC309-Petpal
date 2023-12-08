import { useState, useEffect } from "react";
import { ErrorDisplay } from "./components/FormFields";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { removeUser } from "../../utils/credential";

const ResetTitle = () => {
    return ( 
    <div className="font-medium text-lg mb-4"> Reset your password</div> 
    );
}

const NewPasswordField = ({password, setPassword}) => {
    return (
        <div className="my-1 flex flex-col">
            <label className="text-sm mb-1 px-1 py-1">New password</label>
            <input type="password" className="px-1 py-1 rounded-sm
            focus:ring-primary focus:outline-none focus:ring-1" value={password}
            onChange={(event) => {setPassword(event.target.value)}}/>
        </div>
    );
}

const NewPassword2Field = ({password2, setPassword2}) => {
    return (
        <div className="my-1 flex flex-col">
            <label className="text-sm mb-1 px-1 py-1">Confirm new password</label>
            <input type="password" className="px-1 py-1 rounded-sm
            focus:ring-primary focus:outline-none focus:ring-1" value={password2}
            onChange={(event) => {setPassword2(event.target.value)}}/>
        </div>
    );
}

const ResetPasswordConfirm = () => {
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const {uid, token} = useParams();

    useEffect(() => {
        removeUser();
    }, []);

    const validate = () => {
        if (password !== password2) {
            setError("Passwords don't match");
            return false;
        }
        if (password === '') {
            setError("Please enter your new password");
            return false;
        }
        return true;
    }

    const ResetHandle = () => {
        if (!validate()) {
            return;
        }
        setError('');
        setIsLoading(true);
        
        const requestBody = {
            uid: uid,
            token: token,
            new_password: password,
            re_new_password: password2
        }
        fetch("https://petpal.api.jimschenchen.com/auth/users/reset_password_confirm/", 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)
        }).then(res => {
            if (!res.ok) {
                throw Error(JSON.stringify(res.json()));
            }
            navigate('/auth/login');
        }).catch(err => {
            setError(err.message);
            setIsLoading(false);
        })
    }

    return ( 
        <div className="z-10 flex justify-center items-center w-full -mt-px">
            <form className="flex mx-3 w-full max-w-[540px] bg-background flex-col p-4 mt-3 rounded-lg">
                <ResetTitle/>
                
                <NewPasswordField password={password} setPassword={setPassword}/>
                <NewPassword2Field password2={password2} setPassword2={setPassword2}/>
                <ErrorDisplay error={error}/>   
                
        
                <button 
                className="bg-primary text-white rounded-md py-1 
                hover:shadow-md hover:bg-[#744124] h-8"
                onClick={(e) => {
                    e.preventDefault(); 
                    ResetHandle();
                    }}>
                    {isLoading? <CircularProgress color="inherit" size="1.5rem"/>: "Reset password"}
                </button>
            </form>
        </div>
    );
}
 
export default ResetPasswordConfirm;