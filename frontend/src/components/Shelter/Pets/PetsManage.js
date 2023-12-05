import ManagePetItem from './PetItemManage';
import { useState } from "react";

const ManagePets = (shelter) => {
  const [pets, setPets] = useState([

    { id: 1, Name: 'Tom', Breed: 'Teddy', Age: '1 year', Size: 'small', Gender: 'Male', Status: 'Available' },
    { id: 2, Name: 'Jerry', Breed: 'Ragdoll', Age: '8 months', Size: 'small', Gender: 'Female', Status: 'Available' },

  ]);

  return (
    <div className="border-b mb-6 flex-col text-center duration-300 hover:bg-gray-100 hover:shadow-md  md:flex md:justify-between md:text-center ">

      {pets.map(pet => (
        <ManagePetItem key={pet.id} Name={pet.Name} Breed={pet.Breed} Age={pet.Age} Size={pet.Size} Gender={pet.Gender} Status={pet.Status} Img={pet.Img} />
      ))}
    </div>
  );
};

export default ManagePets;