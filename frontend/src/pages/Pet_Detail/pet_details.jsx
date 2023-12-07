import { useState } from 'react';
import InfoContent from '../../components/Pet/InfoContent';
import DetailContent from '../../components/Pet/DetailContent';
import AdoptContent from '../../components/Pet/AdoptContent';
import { useParams } from 'react-router';
import PageFrame from '../../components/PageFrame';
import useFetchGet from '../../utils/useFetch';
import { CircularProgress } from '@mui/material';


const PetDetails = () => {
    const { petId } = useParams();

    const [activeTab, setActiveTab] = useState('info');

    const {data, isLoading, error} = useFetchGet(`pets/pet/${petId}`);

    const handleAdoptClick = () => {

    };

    return (
        <PageFrame>
            {isLoading && <center className='mt-10'><CircularProgress color='inherit'/></center>}
            {!isLoading && 
            <div className="container mx-auto px-3 py-5 mt-8">
                <div className="flex flex-col justify-center items-center">
                    {/* <!-- Pet Photo --> */}
                    {data.image &&
                    <div className="mb-10 w-40 rounded-lg overflow-hidden scale-150">
                        <img src={data.image}
                            alt="Pet Image"/>
                    </div>}

                    {/* <!-- Pet Information --> */}
                    <ul className="flex  text-sm font-medium text-center text-gray-500 border-b border-gray-200 w-full lg:w-4/5">
                        <li className="mr-2">
                            <button onClick={() => setActiveTab('info')} 
                            className={activeTab==='info'? 'detail-active-tab': 'detail-inactive-tab'}>Info</button>
                        </li>
                        <li className="mr-2">
                            <button onClick={() => setActiveTab('detail')} 
                            className={activeTab==='detail'? 'detail-active-tab': 'detail-inactive-tab'}>Detail</button>
                        </li>
                        <li className="mr-2">
                            <button onClick={() => setActiveTab('adopt')} 
                            className={activeTab==='adopt'? 'detail-active-tab': 'detail-inactive-tab'}>Adopt</button>
                        </li>
                    </ul>

                    {/* Tab Content */}
                    {activeTab === 'info' && !isLoading && <InfoContent pet={data} />}
                    {activeTab === 'detail' && <DetailContent pet={data} />}
                    {activeTab === 'adopt' && <AdoptContent pet={data} onAdoptClick={handleAdoptClick} />}                   
                </div>
            </div>}
        </PageFrame>
    );
};

export default PetDetails;
