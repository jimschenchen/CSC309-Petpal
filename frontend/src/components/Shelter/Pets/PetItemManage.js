import { Link } from "react-router-dom";

const ManagePetItem = ({ pet }) => {
    // const handleClick= () =>{
    //     fetch(,{method:'DELETE'})
    // }
    return (

        <div className="border-b flex-row justify-center items-center text-center duration-300 hover:bg-gray-100 hover:shadow-md md:flex md:justify-start md:text-center">
            <div className="flex flex-1 justify-center md:flex-none object-cover p-4 overflow-hidden h-[15rem]">
                <img src={'Img'} alt="Pet Image" className="rounded" />
            </div>
            <div className="flex flex-1 flex-wrap justify-evenly">
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Name:{pet.Name}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Breed:{pet.Breed}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Age:{pet.Age}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Size:{pet.Size}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Gender:{pet.Gender}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Status:{pet.Status}</h3>
            </div>
            <div className="flex my-2 sm:flex-col gap-2 items-center justify-center mx-4">
                <Link
                    to={{
                        pathname: "/pets/${pet.key}"
                    }}
                    className="bg-primary text-white hover:font-bold py-2 w-16 rounded"
                >
                    Edit
                </Link>
                <button className="bg-primary text-white hover:font-bold py-2 w-16 rounded">Delete</button>
            </div>
        </div>

    );
};

export default ManagePetItem;