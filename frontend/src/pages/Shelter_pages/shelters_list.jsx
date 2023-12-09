import PageFrame from "../../components/PageFrame";
import ShelterList from "../../components/Shelter/SheltersList/ShelterList";


const SheltersList = () => {


    return (
        <PageFrame>
            <div className="mx-2 md:flex md:mr-6 md:ml-6">
                {/* Shelter List Section */}
                {<ShelterList />}
            </div>
        </PageFrame>

    );
};

export default SheltersList;