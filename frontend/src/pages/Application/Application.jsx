import { useEffect, useState } from "react";
import PageFrame from "../../components/PageFrame";
import TabHeader from "./components/TabHeader";
import ApplicationBody from "./components/ApplicationBody";
import MessageBody from "./components/MessageBody";
import { useNavigate, useParams } from "react-router";
import useFetchGet from "../../utils/useFetch";
import NotFound from "../NotFound";
import { CircularProgress } from "@mui/material";
import { getUser } from "../../utils/credential";

const TabBody = ({activeTab}) => {
    if (activeTab === 'msg-tab') {
        return <MessageBody/>
    }
    else {
        return <ApplicationBody/>
    }
}

const Application = () => {
    const [activeTab, setActiveTab] = useState('msg-tab');
    const { applicationId } = useParams();
    
    const [applicationData, setApplicationData] = useState(null);
    const [petData, setPetData] = useState(null);
    const [commentData, setCommentData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        // fetch application data
        fetch(
            `https://petpal.api.jimschenchen.com/applications/application/${applicationId}/`, 
            {method: "GET", 
            headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${getUser().token}`}
        })
        .then(res => {
            if (!res.ok) {throw Error(res.status)}
            return res.json();
        })
        .then(data => {
            setApplicationData(data); 

            // fetch pet data
            return fetch(`https://petpal.api.jimschenchen.com/pets/pet/${data.pet}/`);
        })
        .then(res => res.json())
        .then(data => {
            setPetData(data);

            // fetch comment data
            return fetch(
                `https://petpal.api.jimschenchen.com/comments/application/${applicationId}/comments/`,
                {
                    method: "GET", 
                    headers:{
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${getUser().token}`
                    }
                })
            }
        )
        .then(res => res.json())
        .then(data => {
            setIsLoading(false);
            setCommentData(data);
        })
        .catch(err => {
            setIsLoading(false);
            setError(err.message);
        })
    }, []);


    if (error == 403) {
        return <NotFound/>;
    }

    return ( 
        <PageFrame requiredLogin={true}>
            <div className="h-full w-full flex items-center justify-center">
                <div className="max-w-[800px] w-full flex flex-col items-center">
                    {isLoading && <CircularProgress color="inherit"/>}
                    {!isLoading && <>
                        <TabHeader activeTab={activeTab} setActiveTab={setActiveTab}/>
                        {activeTab === 'msg-tab' && 
                        <MessageBody commentData={commentData} applicationId={applicationId}/>}
                        {activeTab === 'app-tab' && <ApplicationBody applicationData={applicationData} petData={petData}/>}
                    </>}
                    
                </div>
            </div>
            
        </PageFrame>
    );
}
 
export default Application;