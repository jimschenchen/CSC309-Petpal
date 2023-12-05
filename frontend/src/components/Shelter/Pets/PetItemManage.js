import { Link } from "react-router-dom";

const ManagePetItem = ({ Name, Breed, Age, Size, Gender, Status, Img }) => {
    // const handleClick= () =>{
    //     fetch(,{method:'DELETE'})
    // }
    return (

        <div className="border-b flex-row justify-center items-center text-center duration-300 hover:bg-gray-100 hover:shadow-md md:flex md:justify-start md:text-center">
            <div className="flex flex-1 justify-center md:flex-none object-cover p-4 overflow-hidden h-[15rem]">
                <img src={Img} alt="Pet Image" className="rounded" />
            </div>
            <div className="flex flex-1 flex-wrap justify-evenly">
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Name:{Name}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Breed:{Breed}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Age:{Age}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Size:{Size}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Gender:{Gender}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Status:{Status}</h3>
            </div>
            <div className="flex my-2 sm:flex-col gap-2 items-center justify-center mx-4">
                <Link
                    to={{
                        pathname: "/update_pet",
                        state: { Name, Breed, Age, Size, Gender, Status, Img }
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