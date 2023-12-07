import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageFrame from '../../components/PageFrame';
import { getUser, removeUser } from "../../utils/credential";
import useFetchGet from '../../utils/useFetch';
import { Dialog } from '@mui/material';

const ChangePassword = () => {

    const { userId } = useParams();
    const [password, setPassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [showRedirModal, setShowRedirModal] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedPassword = {
            password,
            confirm_password: newpassword
        };
        console.log(updatedPassword);

        try {
            // Make a PUT request to update the profile
            const response = await fetch(`https://petpal.api.jimschenchen.com/accounts/user/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getUser().token}`
                },
                body: JSON.stringify(updatedPassword)
            });
            console.log('Profile updated:', await response.json());
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response);

            // Redirect to the appropriate page after successful creation
            // removeUser(); 
            // window.alert('Password changed successfully, please log in using new password');
            // navigate('/auth/login')
            setShowRedirModal(true);
        } catch (err) {
            console.error("Error updating Profile:", err);
        }
    };

    return (
        <>
        <PageFrame>
            <div className="bg-background">

                <main className="mt-0">
                    <div className="container mx-auto max-w-md">
                        <h1 className="text-2xl font-bold mb-6 text-center">Change Password</h1>

                        <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="username"
                                aria-hidden="true"
                            />

                            {/* <!-- New Password --> */}
                            <div className="mb-4">
                                <label htmlFor="newPassword" className="block text-sm font-bold mb-2">New Password:</label>
                                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} id="newPassword" name="newPassword" placeholder="Enter new password"
                                    className="w-full px-3 py-2 border rounded-md" autoComplete="new-password" />
                            </div>

                            {/* <!-- Confirm New Password --> */}
                            <div className="mb-4">
                                <label htmlFor="confirmNewPassword" className="block text-sm font-bold mb-2">Confirm New Password:</label>
                                <input type="password" required value={newpassword} onChange={(e) => setNewpassword(e.target.value)} id="confirmNewPassword" name="confirmNewPassword"
                                    placeholder="Confirm new password" className="w-full px-3 py-2 border rounded-md" autoComplete="new-password" />
                            </div>

                            {/* <!-- Submit Button --> */}
                            <div className="mt-6 flex ">
                                <button type="submit" className="w-3/4 sm:w-full bg-primary text-white hover:font-bold py-2 px-4 rounded mr-6 text-center">Change Password</button>
                                <button onClick={() => navigate(-1)} className="w-1/4 sm:w-full bg-primary text-white hover:font-bold py-2 px-4 rounded text-center">Back</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
            </PageFrame>
            <Dialog
            open={showRedirModal}
            >
                <div className='p-4 flex flex-col gap-3'>
                    <div>
                        Password changed successfully. Please log in using new password.
                    </div>
                    <div className='flex justify-center'>
                    <button 
                    onClick={() => {removeUser(); navigate('/auth/login')}}
                    onClose={() => {removeUser(); navigate('/auth/login')}}
                    className='bg-primary text-white hover:font-bold py-1 px-5 rounded'>
                        Ok
                    </button>
                    </div>
                    
                </div>

                
            </Dialog>
            </>
    );
};

export default ChangePassword;
