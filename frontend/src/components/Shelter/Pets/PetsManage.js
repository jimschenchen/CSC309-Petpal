import { Request } from '../../../utils/Request';
import ManagePetItem from './PetItemManage';
import { useEffect, useState } from "react";


const ManagePets = ({shelter}) => {
  const [pets, setPets] = useState([]);

  const getPets = async () => {
    try {
      const res = await Request("/pets/", "GET");
      console.log(res.results);
      // add a filter 
      setPets(res.results);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPets();
  }, [])

  return (
    <div className="border-b mb-6 flex-col text-center duration-300 hover:bg-gray-100 hover:shadow-md  md:flex md:justify-between md:text-center ">

      {pets.map(pet => (
        <ManagePetItem pet={pet} />
      ))}
    </div>
  );
};

export default ManagePets;