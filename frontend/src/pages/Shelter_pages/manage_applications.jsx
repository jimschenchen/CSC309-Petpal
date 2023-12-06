import ManageApplication from '../../components/Shelter/Applications/ApplicationManage';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ApplicationManagement = () => {
    
    return (
        <body className="flex flex-col min-h-screen bg-background">
            <Header userType={"shelter"} username={'user'} />

            <ManageApplication />

            <Footer userType={"shelter"} />
        </body>

    );
};

export default ApplicationManagement;