import useFetchGet from '../../../utils/useFetch';
import PetItem from './PetItem';
import { useEffect, useState } from "react";

const PetList = ({shelter}) => {
  const [pets, setPets] = useState([]);
  const {data, isLoading, error} = useFetchGet(`pets/`);


  useEffect(() => {
    if (data && !isLoading) {
      const filteredPets = data.results.filter(pet => pet.shelter === shelter.id);
      setPets(filteredPets);
      console.log(pets);
    }
  }, [data, isLoading]);

  return (
    <div className="md:flex ">
      <div className="">
        <div className="bg-white mb-6 p-8 md:p-12 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-10 text-center">Available Pets</h2>
          <div className="flex flex-col gap-6 mb-4">
            {pets.map(pet => (
              <PetItem pet={pet} />
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
