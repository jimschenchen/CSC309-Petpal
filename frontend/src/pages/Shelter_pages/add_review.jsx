import { useState } from 'react';
import ReviewCreation from '../../components/Shelter/DetailPage/ReviewAdd';
import PageFrame from "../../components/PageFrame";


const AddReview = () => {
    const userType = 'seeker';
    const username = 'User';

    return (
        <PageFrame userType={userType} username={username}>
            <body className="bg-background">

                <main className="mt-0 p-6">
                    <ReviewCreation/>
                </main>
            </body>
        </PageFrame>


    );
};

export default AddReview;