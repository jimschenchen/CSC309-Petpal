import { getUser } from '../../../utils/credential';
import useFetchGet from '../../../utils/useFetch';
import ManagePetItem from './PetItemManage';
import { useEffect, useState } from "react";


const ManagePets = () => {
  const [pets, setPets] = useState([]);
  const {data, isLoading, error} = useFetchGet(`pets/`);
  const userId = getUser().userId;


  useEffect(() => {
    if (data && !isLoading) {
      const filteredPets = data.results.filter(pet => pet.shelter === userId);
      setPets(filteredPets);
      console.log(pets);
    }
  }, [data, isLoading]);

  return (
    <div className="border-b mb-6 flex-col text-center duration-300 hover:bg-gray-100 hover:shadow-md  md:flex md:justify-between md:text-center ">

      {pets.map(pet => (
        <ManagePetItem pet={pet} />
      ))}
    </div>
  );
};

export default ManagePets;