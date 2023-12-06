import { useState } from 'react';
import ReviewCreation from '../../components/Shelter/DetailPage/AddReview';
import PageFrame from "../../components/PageFrame";


const AddReview = () => {
    const userType = 'seeker';
    const username = 'User';

    const [shelter, setShelter] = useState([
        { id: '1', name: 'PET RESCUE', email: 'contact@petshelter.com', location: '123 Pet Lane, Petville, 12345', avatar: '', phone: '(123) 456-7890', description: 'We are dedicated to rescuing, rehabilitating, and rehoming abandoned pets. Our mission is to find loving forever homes for every pet that comes through our doors.' }
    ])

    return (
        <PageFrame userType={userType} username={username}>
            <body className="bg-background">

                <main className="mt-0 p-6">
                    <ReviewCreation shelter={shelter} />
                </main>
            </body>
        </PageFrame>


    );
};

export default AddReview;