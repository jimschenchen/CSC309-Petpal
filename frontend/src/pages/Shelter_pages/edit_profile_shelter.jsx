import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Request } from '../../utils/Request';
import PageFrame from '../../components/PageFrame';
import { getUser, removeUser, updateUsername } from "../../utils/credential";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const ShelterAccountUpdate = () => {

    const { userId } = useParams();
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const { user_type } = useState('shelter');
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        // Instead of window.confirm, we open the dialog
        setOpen(true);
    };

    const getShelter = async () => {
        try {
            const res = await Request(`/accounts/users/${userId}/profile/`, "GET");
            console.log(res);
            setName(res?.name);
            setAvatar(res?.avatar);
            setEmail(res?.email);
            setPhone(res?.phone_number);
            setAddress(res?.address);
            setDescription(res?.description);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getShelter();
    }, [userId])
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        // Check if files are selected and update state
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files);
            setAvatar(e.target.files[0]);
            console.log(avatar);
        }
    };

    const handleDeleteConfirm = async () => {

        try {
            const response = await fetch(`https://petpal.api.jimschenchen.com/accounts/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getUser().token}`
                }
            });
            if (response.ok) {
                console.log(`User ${name} deleted successfully`);
                handleClose();
                removeUser();
                navigate('/');
            } else {
                console.error("Failed to delete user");
            }
        } catch (err) {
            console.error("Error deleting user:", err);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user_type', 'shelter');
        formData.append('email', email);
        formData.append('name', name);
        formData.append('address', address);
        formData.append('phone_number', phone);
        formData.append('description', description);
        if (avatar instanceof File) {
            formData.append('avatar', avatar);
        }

        try {
            // Make a PUT request to update the profile
            const response = await fetch(`https://petpal.api.jimschenchen.com/accounts/user/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${getUser().token}`
                },
                body: formData
            });
            console.log('Profile updated:', await response.json());
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response);

            // Redirect to the appropriate page after successful creation
            updateUsername(name);
            navigate(`/shelter_detail/${getUser().userId}`);
        } catch (err) {
            console.error("Error updating Profile:", err);
        }
    };

    return (
        <PageFrame>
            <div className="bg-background">
                <main className="mt-0 p-0">
                    <div className="container mx-auto p-8">
                        <h1 className="text-2xl font-bold mb-6 text-center">Shelter Account Update</h1>

                        <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
                            {/* Profile Picture Upload */}
                            <div className="dm:flex dm:justify-between">
                                <div className="mb-4 dm:flex dm:items-center">
                                    <div>
                                        <img src={avatar} alt="Profile Picture" className="w-32 h-32 mr-6 rounded" />
                                    </div>
                                    <div>
                                        <label htmlFor="avatar" className="block text-sm font-bold mb-2">Upload Profile Picture:</label>
                                        <input type="file" id="avatar" name="avatar" onChange={handleImageChange} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-end">
                                    <Link to={`/change_password/${getUser().userId}`} className="bg-primary text-white hover:font-bold py-2 px-4 rounded text-xs md:text-base">Change Password</Link>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-1 font-bold">Name:</label>
                                <input type="text"  value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" className="w-full border rounded px-3 py-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-1 font-bold">Email:</label>
                                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" className="w-full border rounded px-3 py-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block mb-1 font-bold">Phone Number:</label>
                                <input type="text"  value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" name="phone"
                                    className="w-full px-3 py-2 border rounded-md" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="address" className="block text-sm font-bold mb-2">Address:</label>
                                <textarea  value={address} onChange={(e) => setAddress(e.target.value)} id="address" name="address" rows="3"
                                    className="w-full px-3 py-2 border rounded-md"></textarea>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-bold mb-2">Shelter Description:</label>
                                <textarea  value={description} onChange={(e) => setDescription(e.target.value)} id="description" name="description" rows="5"
                                    className="w-full px-3 py-2 border rounded-md"></textarea>
                            </div>
                            <div className='flex justify-between'>
                                <button type="submit" className="bg-primary text-white hover:font-bold py-2 px-4 rounded">Update Account</button>
                                <button type="button" onClick={handleDelete} className="bg-primary text-white hover:font-bold py-2 px-4 rounded">Delete Account</button>
                            </div>
                        </form>
                    </div>
                </main>

                <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Pet Deletion"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete {name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions><Button onClick={handleDeleteConfirm} autoFocus sx={{
                    backgroundColor: '#10B981', // Tailwind green-600
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#059669', // Tailwind green-700
                    },
                    py: 1, // theme.spacing(1)
                    px: 2, // theme.spacing(2)
                }}>
                    Confirm
                </Button>
                    <Button onClick={handleClose} sx={{
                        backgroundColor: '#EF4444', // Tailwind red-600
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#DC2626', // Tailwind red-700
                        },
                        py: 1, // theme.spacing(1)
                        px: 2, // theme.spacing(2)
                    }}>Cancel</Button>
                </DialogActions>
            </Dialog>
            </div></PageFrame>
    );
};

export default ShelterAccountUpdate;
