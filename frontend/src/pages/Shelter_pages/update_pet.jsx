import { useEffect, useState } from 'react';
import UpdatePet from '../../components/Shelter/Pets/UpdatePet';
import PageFrame from '../../components/PageFrame';


const PetsUpdate = () => {

    return (
        <PageFrame>
        <body className="bg-background">

            <main className="mt-0 p-6">
                <UpdatePet/>
            </main>

        </body>
</PageFrame>
    );
};

export default PetsUpdate;