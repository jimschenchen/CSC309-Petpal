import ManageApplication from '../../components/Shelter/Applications/ApplicationManage';
import { useState } from 'react';

const ApplicationManagement = () => {
    const [shelter, setShelter] = useState([
        { id: '1', name: 'PET RESCUE', email: 'contact@petshelter.com', location: '123 Pet Lane, Petville, 12345', avatar: '', phone: '(123) 456-7890', description: 'We are dedicated to rescuing, rehabilitating, and rehoming abandoned pets. Our mission is to find loving forever homes for every pet that comes through our doors.' }
    ])
    return (
        <body className="flex flex-col min-h-screen bg-background">
            <header>
                Header
            </header>

            <ManageApplication shelter={shelter}/>

            <footer>
                Footer
            </footer>
        </body>

    );
};

export default ApplicationManagement;