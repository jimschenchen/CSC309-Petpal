import { Link, Navigate, useNavigate } from "react-router-dom";
import { getUser } from "../../../utils/credential";
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const ManagePetItem = ({ pet }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        // Instead of window.confirm, we open the dialog
        setOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`https://petpal.api.jimschenchen.com/pets/pet/${pet.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getUser().token}`
                }
            });
            if (response.ok) {
                console.log(`Pet ${pet.name} deleted successfully`);
                handleClose();
                navigate('/manage_pets/', { replace: true });
                window.location.reload();
            } else {
                console.error("Failed to delete pet");
            }
        } catch (err) {
            console.error("Error deleting pet:", err);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <div className="border-b flex-row justify-center items-center text-center duration-300 hover:bg-gray-100 hover:shadow-md md:flex md:justify-start md:text-center">
            <div className="flex flex-1 justify-center md:flex-none object-cover p-4 overflow-hidden h-[15rem]">
                <img src={pet.image} alt="Pet Image" className="rounded" />
            </div>
            <div className="flex flex-1 flex-wrap justify-evenly">
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Name:{pet.name}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Breed:{pet.breed}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Age:{pet.age}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Size:{pet.size}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Gender:{pet.gender}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Status:{pet.status}</h3>
            </div>
            <div className="flex my-2 sm:flex-col gap-2 items-center justify-center mx-4">
                <Link
                    to={`/pets/${pet.id}`}
                    className="bg-primary text-white hover:font-bold py-2 w-16 rounded"
                >
                    Edit
                </Link>
                <button onClick={handleDelete} className="bg-primary text-white hover:font-bold py-2 w-16 rounded">Delete</button>
            </div>

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
                        Are you sure you want to delete {pet.name}?
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
        </div>

    );
};

export default ManagePetItem;