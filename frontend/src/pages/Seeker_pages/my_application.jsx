import ApplicationList from '../../components/Seeker/ApplicationList';
import { useState } from 'react';
import PageFrame from '../../components/PageFrame';

const MyApplication = () => {
    return (
        <PageFrame>

                <ApplicationList/>

        </PageFrame>
    );
};

export default MyApplication;