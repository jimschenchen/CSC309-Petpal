import ManagePetItem from './PetItemManage';
import { useState } from "react";

const ManagePets = (props) => {
const shelter = props.shelter;
const pets = props.pets
  return (
    <div className="border-b mb-6 flex-col text-center duration-300 hover:bg-gray-100 hover:shadow-md  md:flex md:justify-between md:text-center ">

      {pets.map(pet => (
        <ManagePetItem pet={pet} />
      ))}
    </div>
  );
};

export default ManagePets;