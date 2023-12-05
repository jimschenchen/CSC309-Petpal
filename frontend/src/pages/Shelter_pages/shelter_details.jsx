import PetList from '../../components/Shelter/Pets/PetList';
import Reviews from '../../components/Shelter/DetailPage/ReviewList';
import Contact from '../../components/Shelter/DetailPage/Contact';
import ShelterHeader from '../../components/Shelter/DetailPage/ShelterHeader';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ShelterDetails = () => {
    const [shelter, setShelter] = useState([
        {id:'1', name:'PET RESCUE', email:'contact@petshelter.com', location:'123 Pet Lane, Petville, 12345', avatar:'', phone:'(123) 456-7890', description:'We are dedicated to rescuing, rehabilitating, and rehoming abandoned pets. Our mission is to find loving forever homes for every pet that comes through our doors.'}
    ])
    return (
        <body className="bg-background ">
            <Header userType={"shelter"} username={'user'} />

            <div className="m-6 md:m-12 p-2">
                {/* Shelter Header */}
                <ShelterHeader shelter={shelter} />

                <div className="md:flex justify-between">
                    <div className="md:mr-6">
                        {/* Pet List Section */}
                        <div><PetList shelter={shelter}/></div>

                        {/* Reviews Section */}
                        <div><Reviews shelter={shelter}/></div>


                    </div>
                    {/* Contact Section */}
                    <div>
                        <Contact shelter={shelter}/>
                    </div>

                </div>

            </div>

            <Footer userType={"shelter"} />
        </body>

    );
};

export default ShelterDetails;
