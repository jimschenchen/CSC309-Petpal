import Moment from "react-moment";
import { Link } from "react-router-dom";

const ApplicationItemSeeker = ({ ID, PetName, LastUpdate, Status, Created }) => {

    const statusColor = (status) => {
        switch(status){
            case "Accepted":
                return 'text-green-600';
            case "Pending":
                return 'text-yellow-600';
            case "Withdrawn":
                return 'text-red-600';
            case "Denied":
                return 'text-red-600';
            default:
                return 'text-primary';
        }
    }

    return (
        <Link to = {`/application/${ID}`} className="flex justify-center sm:justify-between font-normal px-2 sm:px-4 py-2 sm:py-4 my-2 bg-white rounded-lg hover:bg-gray-100 hover:shadow-md ">
            <div className="sm:w-1/4  w-1/3 text-center">{PetName}</div>
            <div className="sm:w-1/4  w-1/3 text-center">
                <Moment format="MMM DD, YYYY">{LastUpdate}</Moment>
            </div>
            <div className="sm:w-1/4 sm:block text-center hidden w-1/2">
                <Moment format="MMM DD, YYYY">{Created}</Moment>
            </div>
            <div 
            className={`sm:w-1/4  w-1/3 text-center ${statusColor(Status)}`}>
                {Status}
            </div>
        </Link>
        
    );
};

export default ApplicationItemSeeker;