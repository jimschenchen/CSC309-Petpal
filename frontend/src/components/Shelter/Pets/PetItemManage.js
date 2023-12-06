import { Link, Navigate } from "react-router-dom";

const ManagePetItem = ({ pet }) => {
    const handleDelete = async () => {
        if(window.confirm(`Are you sure you want to delete ${pet.name}?`)) {
            try {
                fetch(`https://petpal.api.jimschenchen.com/pets/pet/${pet.id}`,{
                    method: 'DELETE'
                });
                console.log(`Pet ${pet.name} deleted successfully`);
                Navigate('/manage_pets');
            } catch (err) {
                console.error("Error deleting pet:", err);
            }
        }
    }
    return (

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
            <div className="flex my-2 sm:flex-col gap-2 items-center justify-center mx-4">
                <Link
                    to={`/pets/${pet.id}`}
                    className="bg-primary text-white hover:font-bold py-2 w-16 rounded"
                >
                    Edit
                </Link>
                <button onClick={handleDelete} className="bg-primary text-white hover:font-bold py-2 w-16 rounded">Delete</button>
            </div>
        </div>

    );
};

export default ManagePetItem;