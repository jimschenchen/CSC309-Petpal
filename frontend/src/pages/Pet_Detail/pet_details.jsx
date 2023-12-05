import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import InfoContent from '../../components/Pet/InfoContent';
import DetailContent from '../../components/Pet/DetailContent';
import AdoptContent from '../../components/Pet/AdoptContent';

const PetDetails = () => {
    const [pets, setPets] = useState(

        { id: 1, Name: 'Tom', Breed: 'Teddy', Age: '1 year', Size: 'small', Gender: 'Male', Status: 'Available' }

    );

    const [activeTab, setActiveTab] = useState('info');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleAdoptClick = () => {

    };

    return (
        <div className='flex flex-col min-h-screen bg-background'>
            <Header userType={"shelter"} username={'user'} />


            <main className="container mx-auto px-3 py-5">
                <div className='flex flex-col justify-center '>
                    {/* Pet Details Section */}
                    {/* Pet Photo */}
                    <div className="mb-4 w-40 rounded-lg overflow-hidden">
                        <img src="\src\img\cat114.jpg" alt="Pet Image" />
                    </div>

                    {/* Pet Information Tabs */}
                    <ul className="flex text-sm font-medium text-center text-gray-500 border-b border-gray-200 w-full">
                        <li className="mr-2">
                            <button onClick={() => handleTabClick('info')} className={activeTab === 'info' ? 'detail-active-tab' : 'detail-inactive-tab'}>Info</button>
                        </li>
                        <li className="mr-2">
                            <button onClick={() => handleTabClick('detail')} className={activeTab === 'detail' ? 'detail-active-tab' : 'detail-inactive-tab'}>Detail</button>
                        </li>
                        <li className="mr-2">
                            <button onClick={() => handleTabClick('adopt')} className={activeTab === 'adopt' ? 'detail-active-tab' : 'detail-inactive-tab'}>Adopt</button>
                        </li>
                    </ul>

                    {/* Tab Content */}
                    {activeTab === 'info' && <InfoContent pet={pets} />}
                    {activeTab === 'detail' && <DetailContent pet={pets} />}
                    {activeTab === 'adopt' && <AdoptContent pet={pets} onAdoptClick={handleAdoptClick} />}
                </div>

            </main>

            <Footer userType={"shelter"} />
        </div>
    );
};

export default PetDetails;
