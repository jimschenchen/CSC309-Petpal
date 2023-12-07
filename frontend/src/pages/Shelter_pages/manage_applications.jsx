import ManageApplication from '../../components/Shelter/Applications/ApplicationManage';
import PageFrame from '../../components/PageFrame';

const ApplicationManagement = () => {
    
    return (
        <PageFrame>
        <body className="flex flex-col min-h-screen bg-background">
            <ManageApplication />
        </body>
        </PageFrame>
    );
};

export default ApplicationManagement;