import { useEffect, useState } from 'react';
import UpdatePet from '../../components/Shelter/Pets/UpdatePet';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';

const PetsUpdate = () => {
    const{petId} = useParams();
    const [pet, setPet] = useState({});

    useEffect(() => {
        // Fetch or retrieve the pet's data using petId
        // Example: fetchPetData(petId).then(data => setPet(data));
      }, [petId]);

    return (
        <body className="bg-background">
            <Header userType={"shelter"} username={'user'} />

            <main class="mt-0 p-6">
                <UpdatePet pet={pet}/>
            </main>

            <Footer userType={"shelter"} />
        </body>

    );
};

export default PetsUpdate;