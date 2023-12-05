import PetList from '../../components/Shelter/Pets/PetList';
import Reviews from '../../components/Shelter/DetailPage/ReviewList';
import Contact from '../../components/Shelter/DetailPage/Contact';
import ShelterHeader from '../../components/Shelter/DetailPage/ShelterHeader';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Request } from "../../utils/Request";

const ShelterDetails = () => {
    const [shelter, setShelter] = useState('hello');

    const getShelter = async () => {
        try {
          const res = await Request("/accounts/users/4/profile/", "GET");
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
        <body className="bg-background ">
            <Header userType={"shelter"} username={'user'} />

            <div className="m-6 md:m-12 p-2">
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

            <Footer userType={"shelter"} />
        </body>

    );
};

export default ShelterDetails;
