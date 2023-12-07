import ApplicationList from '../../components/Seeker/ApplicationList';
import { useState } from 'react';
import PageFrame from '../../components/PageFrame';

const MyApplication = () => {
    return (
        <PageFrame>
            <body className="flex flex-col min-h-screen bg-background">

                <ApplicationList/>

            </body>
        </PageFrame>
    );
};

export default MyApplication;