import ApplicationList from '../../components/Shelter/Applications/ApplicationList';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MyApplication = () => {
    const [shelter, setShelter] = useState([
        { id: '1', name: 'PET RESCUE', email: 'contact@petshelter.com', location: '123 Pet Lane, Petville, 12345', avatar: '', phone: '(123) 456-7890', description: 'We are dedicated to rescuing, rehabilitating, and rehoming abandoned pets. Our mission is to find loving forever homes for every pet that comes through our doors.' }
    ])
    return (
        <body className="flex flex-col min-h-screen bg-background">
            <Header userType={"seeker"} username={'user'} />

            <ApplicationList shelter={shelter}/>

            <Footer userType={"seeker"} />
        </body>

    );
};

export default MyApplication;