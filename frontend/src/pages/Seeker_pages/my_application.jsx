import ApplicationList from '../../components/Seeker/ApplicationList';
import { useState } from 'react';
import PageFrame from '../../components/PageFrame';

const MyApplication = () => {
    const [shelter, setShelter] = useState([
        { id: '1', name: 'PET RESCUE', email: 'contact@petshelter.com', location: '123 Pet Lane, Petville, 12345', avatar: '', phone: '(123) 456-7890', description: 'We are dedicated to rescuing, rehabilitating, and rehoming abandoned pets. Our mission is to find loving forever homes for every pet that comes through our doors.' }
    ])
    return (
        <PageFrame userType={'seeker'} username={'user'}>
            <body className="flex flex-col min-h-screen bg-background">

                <ApplicationList shelter={shelter} />

            </body>
        </PageFrame>
    );
};

export default MyApplication;