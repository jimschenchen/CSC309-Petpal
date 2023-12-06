import CreatePet from '../../components/Shelter/Pets/CreatePet';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const PetsCreation = () => {

    return (
        <body className="bg-background">
            <Header userType={"shelter"} username={'user'} />

            <main class="mt-0 p-6">
                <CreatePet />
            </main>

            <Footer userType={"shelter"} />
        </body>

    );
};

export default PetsCreation;