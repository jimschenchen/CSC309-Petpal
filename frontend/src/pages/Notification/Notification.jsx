import PageFrame from "../../components/PageFrame";
import SmsIcon from '@mui/icons-material/Sms';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Link } from "react-router-dom";
import useFetchGet from "../../utils/useFetch";
import { getUser } from "../../utils/credential";

const NotificationCard = ({Icon, message, time_string}) => {
    const userType = getUser().userType;
    const icon_color = () => {
        return (userType === 'seeker'? "text-primary": "text-shelter");
    }

    return (
        <Link className="flex justify-between bg-white rounded-lg px-2 sm:px-4 py-2 sm:py-4 my-1 duration-300 white-card-hover">
            <div className="flex justify-start gap-2">
                <Icon className={icon_color()}/>
                <div className="font-normal">{message}</div>
            </div>
            <div className="flex justify-end font-light">{time_string}</div>
        </Link>
    );
}

const Notification = () => {
    const {data, isLoading, error} = useFetchGet('notifications/', {page:1, "page_size": 2});
    console.log(data);

    return (
        <PageFrame requiredLogin={true}>
            <div className="flex justify-center items-center">
                <div className="flex mx-3 w-full max-w-[800px] bg-background flex-col">
                    <div className="font-bold text-2xl my-3 mx-3 left-0">Notifications</div>

                    <NotificationCard 
                    Icon={SmsIcon} 
                    message={"User sent you a message"} 
                    time_string={"3d ago"}/>
                    
                    <NotificationCard
                    Icon={EditNoteIcon}
                    message={"You received a notification"}
                    time_string={'4w ago'}
                    />
                </div> 
            </div>
        </PageFrame>
    );
}
 
export default Notification;