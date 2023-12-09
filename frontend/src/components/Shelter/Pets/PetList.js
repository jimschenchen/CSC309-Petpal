import useFetchGet from '../../../utils/useFetch';
import useFlexFetch from '../../../utils/useFlexFetch';
import PetItem from './PetItem';
import { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';

const PetList = ({shelter}) => {
  const [pets, setPets] = useState([]);
  const {data, isLoading, error} = useFlexFetch(`pets/?shelter=${shelter.id}`, 'GET');


  // useEffect(() => {
  //   if (data && !isLoading) {
  //     const filteredPets = data.results.filter(pet => pet.shelter === shelter.id);
  //     setPets(filteredPets);
  //   }
  // }, [data, isLoading]);

  return (
    <>
    {isLoading && <center className='m-3'><CircularProgress color='inherit'/></center>}
    {!isLoading && data && data.results.map(pet => (
            <PetItem key={pet.id} pet={pet} />
          ))}
    </>
  );
};

export default PetList;
