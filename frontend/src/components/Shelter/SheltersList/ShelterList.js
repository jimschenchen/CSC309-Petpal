import useFlexFetch from '../../../utils/useFlexFetch';
import { useEffect, useState } from "react";
import ShelterItem from './ShelterItem';

const ShelterList = () => {
  const [shelters, setShelters] = useState([]);
  const { data, isLoading, error } = useFlexFetch(`accounts/users/`, 'GET');


  useEffect(() => {
      if (data && !isLoading) {
          setShelters(data.results);
      }
  }, [data, isLoading]);


  return (
    <div className="md:flex-col w-full bg-white my-10">
          <h2 className="text-2xl font-bold mb-10 text-center">Shelters List</h2>
          <div className="flex flex-col gap-6 mb-4 mx-4">
            {shelters.map(shelter => (
              <ShelterItem shelter={shelter} />
            ))}
          </div>
          <div className="flex justify-end">
          </div>
    </div>
  );
};

export default ShelterList;