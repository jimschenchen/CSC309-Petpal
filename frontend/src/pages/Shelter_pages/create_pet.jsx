import CreatePet from '../../components/Shelter/Pets/CreatePet';

import PageFrame from '../../components/PageFrame';

const PetsCreation = () => {

    return (
        <PageFrame>
        <body className="bg-background">

            <main className="mt-0 p-6">
                <CreatePet />
            </main>

        </body>
        </PageFrame>

    );
};

export default PetsCreation;