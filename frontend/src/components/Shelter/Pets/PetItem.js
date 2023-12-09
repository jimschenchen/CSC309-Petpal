import { Link } from "react-router-dom";
const PetItem = ({pet}) => {
    return (
        <Link to={`/pet_detail/${pet.id}/`}>
        <div className="border-b flex-row justify-center items-center text-center duration-300 hover:bg-gray-100 hover:shadow-md md:flex md:justify-start md:text-center">
            <div className="flex flex-1 justify-center md:flex-none object-cover p-4 overflow-hidden h-[15rem]">
                <img src={pet.image} alt="Pet Image" className="rounded" />
            </div>
            <div className="flex flex-1 flex-wrap justify-evenly">
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Name:{pet.name}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Breed:{pet.breed}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Age:{pet.age}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Size:{pet.size}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Gender:{pet.gender}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Status:{pet.status}</h3>
            </div>
            
        </div>
        </Link>
        
    );
};

export default PetItem;
