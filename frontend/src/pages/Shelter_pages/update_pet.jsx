import { useEffect, useState } from 'react';
import UpdatePet from '../../components/Shelter/Pets/UpdatePet';
import Header from '../../components/Header';
import Footer from '../../components/Footer';


const PetsUpdate = () => {

    return (
        <body className="bg-background">
            <Header userType={"shelter"} username={'user'} />

            <main class="mt-0 p-6">
                <UpdatePet/>
            </main>

            <Footer userType={"shelter"} />
        </body>

    );
};

export default PetsUpdate;