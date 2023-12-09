import { useState } from 'react';
import SendApplication from '../../components/Seeker/SendApplication';
import PageFrame from "../../components/PageFrame";
import { useParams } from 'react-router-dom';
import useFetchGet from '../../utils/useFetch';


const CreateApplication = () => {
    const {petId} = useParams();
    const {data, isLoading, error} = useFetchGet(`pets/pet/${petId}`);
    console.log('pet:', data);

    return (
        <PageFrame>
            <body className="bg-background">

                <main class="mt-0 p-6">
                    <SendApplication pet={data} petId={petId}/>
                </main>
            </body>
        </PageFrame>


    );
};

export default CreateApplication;