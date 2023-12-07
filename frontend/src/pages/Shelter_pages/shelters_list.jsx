import PageFrame from "../../components/PageFrame";
import ShelterList from "../../components/Shelter/SheltersList/ShelterList";


const SheltersList = () => {


    return (
        <PageFrame>
            <body className="bg-background ">


                <div className="md:flex md:mr-6 md:ml-6">
                    {/* Shelter List Section */}
                    {<ShelterList />}

                </div>



            </body>
        </PageFrame>

    );
};

export default SheltersList;