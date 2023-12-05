import { useState } from "react";

const PetItem = ({ Name, Breed, Age, Size, Gender, Status, img }) => {
    return (
        <div className="border-b flex-row justify-center items-center text-center duration-300 hover:bg-gray-100 hover:shadow-md md:flex md:justify-start md:text-center">
            <div className="flex flex-1 justify-center md:flex-none object-cover p-4 overflow-hidden h-[15rem]">
                <img src={img} alt="Pet Image" className="rounded" />
            </div>
            <div className="flex flex-1 flex-wrap justify-evenly">
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Name:{Name}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Breed:{Breed}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Age:{Age}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Size:{Size}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Gender:{Gender}</h3>
                <h3 className="text-lg font-bold m-2 min-w-[5rem]">Status:{Status}</h3>
            </div>
            
        </div>
        
    );
};

export default PetItem;
