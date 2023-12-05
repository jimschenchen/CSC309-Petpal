import PageFrame from "../../components/PageFrame";
import SmsIcon from '@mui/icons-material/Sms';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Link } from "react-router-dom";

const NotificationCard = ({userType, Icon, message, time_string}) => {
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
    const userType = 'seeker';
    const username = 'User';

    return (
        <PageFrame userType={userType} username={username}>
            <div className="flex justify-center items-center">
                <div className="flex mx-3 w-full max-w-[800px] bg-background flex-col">
                    <div className="font-bold text-2xl my-3 mx-3 left-0">Notifications</div>

                    <NotificationCard 
                    userType={userType}
                    Icon={SmsIcon} 
                    message={"User sent you a message"} 
                    time_string={"3d ago"}/>
                    
                    <NotificationCard
                    userType={userType}
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