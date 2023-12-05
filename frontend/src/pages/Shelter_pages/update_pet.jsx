import { useState } from 'react';
import UpdatePet from '../../components/Shelter/Pets/UpdatePet';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const PetsUpdate = () => {
    const [shelter, setShelter] = useState([
        { id: '1', name: 'PET RESCUE', email: 'contact@petshelter.com', location: '123 Pet Lane, Petville, 12345', avatar: '', phone: '(123) 456-7890', description: 'We are dedicated to rescuing, rehabilitating, and rehoming abandoned pets. Our mission is to find loving forever homes for every pet that comes through our doors.' }
    ])
    return (
        <body className="bg-background">
            <Header userType={"shelter"} username={'user'} />

            <main class="mt-0 p-6">
                <UpdatePet shelter={shelter}/>
            </main>

            <Footer userType={"shelter"} />
        </body>

    );
};

export default PetsUpdate;