import PetItem from './PetItem';
import { useState } from "react";

const PetList = (shelter) => {
  const [pets, setPets] = useState([

    { id: 1, Name: 'Tom', Breed: 'Teddy', Age: '1 year', Size: 'small', Gender: 'Male', Status: 'Available'},
    { id: 2, Name: 'Jerry', Breed: 'Ragdoll', Age: '8 months', Size: 'small', Gender: 'Female', Status: 'Available' },

  ]);

  return (
    <div className="md:flex ">
      <div className="">
        <div className="bg-white mb-6 p-8 md:p-12 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-10 text-center">Available Pets</h2>
          <div className="flex flex-col gap-6 mb-4">
            {pets.map(pet => (
              <PetItem key={pet.id} Name={pet.Name} Breed={pet.Breed} Age={pet.Age} Size={pet.Size} Gender={pet.Gender} Status={pet.Status} Img={pet.Img} />
            ))}
          </div>
          <div className="flex justify-end">
          </div>
        </div>
      </div>


    </div>
  );
};

export default PetList;
