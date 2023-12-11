import PetList from '../../components/Shelter/Pets/PetList';
import Reviews from '../../components/Shelter/DetailPage/ReviewList';
import Contact from '../../components/Shelter/DetailPage/Contact';
import ShelterHeader from '../../components/Shelter/DetailPage/ShelterHeader';
import { useEffect, useState } from 'react';
import { Request } from "../../utils/Request";
import PageFrame from "../../components/PageFrame";
import { useParams } from 'react-router-dom';
import useFetchGet from '../../utils/useFetch';

const ShelterDetails = () => {
  const { userId } = useParams('');
  const [shelter, setShelter] = useState('');

  const [activeTab, setActiveTab] = useState('pets');

  const handleChange = (event, newValue) => {
  };
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
  useEffect(() => {
    fetch(`https://petpal.api.jimschenchen.com/accounts/shelters/${userId}/`)
    .then(res => res.json())
    .then(data => {
      setShelter(data);
    })
  }, [])

  const TabHeader = ({activeTab}) => {
    const getClass = (tab) => {
      if (activeTab === tab) {
        return "inline-block p-4 text-base text-black border-b-2 border-black rounded-t-lg"
      }
      else {
        return "inline-block p-4 border-b-2 text-base border-transparent rounded-t-lg hover:text-gray-600"
      }
    }

    return (
      <ul className="w-full px-3 flex flex-wrap -mb-px border-b-2 border-gray-200">
          <li className="me-2">
              <button
              className={getClass('pets')}
              onClick={() => {setActiveTab('pets')}}>Pets</button>
          </li>
          <li className="me-2">
          <button
              className={getClass('reviews')}
              onClick={() => {setActiveTab('reviews')}}>Reviews</button>
          </li>
          <li className="me-2">
          <button
              className={getClass('contacts')}
              onClick={() => {setActiveTab('contacts')}}>Contacts</button>
          </li>
        </ul>
    )
    
  }

  return (
    <PageFrame requiredLogin={true}>
      <div className='mx-2 mt-4'>
      <div className="text-sm font-medium text-center text-gray-500 border-gray-200">
        <ShelterHeader shelter={shelter} />
        
        <div className='bg-white mt-3 rounded-lg'>
        <TabHeader activeTab={activeTab}/>

        <div className='h-[calc(100vh-17.5rem)] 
        md:h-[calc(100vh-21rem)] overflow-y-auto' id="scrollTarget">
          {activeTab==='pets' && <PetList shelter={shelter}/>}
          {activeTab==='reviews' && <Reviews shelter={shelter}/>}
          {activeTab==='contacts' && <Contact shelter={shelter}/>}
        </div>
        </div>
        
      </div>
      
    </div>
        
          {/* <div className="m-6 md:m-12 p-2">
              {shelter && <ShelterHeader shelter={shelter} />}
              <div className="md:flex justify-between">
                  <div className="md:mr-6">
                      <div>{shelter && <PetList shelter={shelter}/>}</div>

                      <div>{shelter && <Reviews shelter={shelter}/>}</div>


                  </div>
                  <div>
                      {shelter && <Contact shelter={shelter}/>}
                  </div>

              </div>

          </div> */}

          
    </PageFrame>

  );
};

export default ShelterDetails;
