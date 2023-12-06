import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ManagePets from '../../components/Shelter/Pets/PetsManage';
import { Request } from "../../utils/Request";
import PageFrame from '../../components/PageFrame';

const PetsManagement = () => {
    const [shelter, setShelter] = useState('');
    const getShelter = async () => {
        try {
          const res = await Request("/accounts/users/4/profile/", "GET");
          console.log(res);
          setShelter(res);
        } catch (err) {
          console.log(err);
        }
      }

      useEffect(() => {
        getShelter();
      }, [])


    

    return (
        <PageFrame userType={'shelter'} username={'user'}>
        <div className="flex flex-col min-h-screen bg-background">
            

            <main className="mt-0 p-6">
                <section className="bg-white p-6 rounded-lg shadow ">
                    <h2 className="text-2xl font-bold mb-4 text-center">Manage Pet Listings</h2>
                    <ManagePets shelter={shelter} />
                    <Link to="/create_pet" className="bg-primary hover:font-bold text-white py-2 px-4 rounded">
                        Create New Pet
                    </Link>
                </section>
            </main>

            
        </div>
        </PageFrame>
    );
};

export default PetsManagement;
