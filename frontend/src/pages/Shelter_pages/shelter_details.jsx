import PetList from '../../components/Shelter/Pets/PetList';
import Reviews from '../../components/Shelter/DetailPage/ReviewList';
import Contact from '../../components/Shelter/DetailPage/Contact';
import ShelterHeader from '../../components/Shelter/DetailPage/ShelterHeader';
import { useEffect, useState } from 'react';
import { Request } from "../../utils/Request";
import PageFrame from "../../components/PageFrame";
import { useParams } from 'react-router-dom';

const ShelterDetails = () => {
    const { userId } = useParams('');
    const [shelter, setShelter] = useState('');

    const getShelter = async () => {
        try {
          const res = await Request(`/accounts/users/${userId}/profile/`, "GET");
          console.log(res);
          setShelter(res);
        } catch (err) {
          console.log(err);
        }
      }
    
      
  
      // Note: the empty deps array [] means
      // this useEffect will run once
      // similar to componentDidMount()
      useEffect(() => {
        getShelter();
      }, [])

    return (
        <PageFrame>
            

            <div className="m-6 md:m-12 p-2 bg-background">
                {/* Shelter Header */}
                {shelter && <ShelterHeader shelter={shelter} />}

                <div className="md:flex justify-between">
                    <div className="md:mr-6">
                        {/* Pet List Section */}
                        <div>{shelter && <PetList shelter={shelter}/>}</div>

                        {/* Reviews Section */}
                        <div>{shelter && <Reviews shelter={shelter}/>}</div>


                    </div>
                    {/* Contact Section */}
                    <div>
                        {shelter && <Contact shelter={shelter}/>}
                    </div>

                </div>

            </div>

            
        </PageFrame>

    );
};

export default ShelterDetails;
