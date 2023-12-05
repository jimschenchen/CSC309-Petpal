import { useState } from 'react';
import { Link } from 'react-router-dom';
import ManagePets from '../../components/Shelter/Pets/PetsManage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const PetsManagement = () => {
    const [shelter, setShelter] = useState([
        { id: '1', name: 'PET RESCUE', email: 'contact@petshelter.com', location: '123 Pet Lane, Petville, 12345', avatar: '', phone: '(123) 456-7890', description: 'We are dedicated to rescuing, rehabilitating, and rehoming abandoned pets. Our mission is to find loving forever homes for every pet that comes through our doors.' }
    ]);

    const [pets, setPets] = useState([

        { id: 1, Name: 'Tom', Breed: 'Teddy', Age: '1 year', Size: 'small', Gender: 'Male', Status: 'Available' },
        { id: 2, Name: 'Jerry', Breed: 'Ragdoll', Age: '8 months', Size: 'small', Gender: 'Female', Status: 'Available' },
    
      ]);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header userType={"shelter"} username={'user'} />

            <main className="mt-0 p-6">
                <section className="bg-white p-6 rounded-lg shadow ">
                    <h2 className="text-2xl font-bold mb-4 text-center">Manage Pet Listings</h2>
                    <ManagePets shelter={shelter} pets={pets} />
                    <Link to="/create_pet" className="bg-primary hover:font-bold text-white py-2 px-4 rounded">
                        Create New Pet
                    </Link>
                </section>
            </main>

            <Footer userType={"shelter"} />
        </div>
    );
};

export default PetsManagement;
