import { useState } from 'react';
import CreatePet from '../../components/Shelter/Pets/CreatePet';

const PetsCreation = () => {
    const [shelter, setShelter] = useState([
        { id: '1', name: 'PET RESCUE', email: 'contact@petshelter.com', location: '123 Pet Lane, Petville, 12345', avatar: '', phone: '(123) 456-7890', description: 'We are dedicated to rescuing, rehabilitating, and rehoming abandoned pets. Our mission is to find loving forever homes for every pet that comes through our doors.' }
    ])
    return (
        <body className="bg-background">
            <header>
                Header
            </header>

            <main class="mt-0 p-6">
                <CreatePet shelter={shelter}/>
            </main>

            <footer>
                Footer
            </footer>
        </body>

    );
};

export default PetsCreation;