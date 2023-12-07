import { Link } from "react-router-dom";

const AdoptContent = ({ pet, onAdoptClick }) => {

    const statusColor = (status) => {
        switch (status){
            case 'available':
                return "text-green-600";
            case 'pending':
                return "text-yellow-600";
            case 'withdrawn':
                return "text-red-600";
            case 'adopted':
                return "text-red-600";
            default:
                return "text-primary";
        }
    }

    return (
        <div className="adopt-content detail-active-page lg:w-4/5 flex flex-col gap-2">
            {/* Shelter and adoption status */}
            <div className="flex gap-2">
                <div className="font-bold">Shelter:</div>
                <Link to={'TODO'} className="text-primary hover:underline">
                    Visit shelter page
                </Link>
            </div>
            <div className="flex gap-2">
                <div className="font-bold">Adoption Status:</div>
                <p className={statusColor(pet.status)}>{pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}</p>
            </div>
            {pet.status==='available' && <Link to={'TODO'} className="bg-primary w-fit text-white hover:font-bold py-2 px-4 rounded">
                Adopt {pet.name}
            </Link>}
            {pet.status !== 'available' && 
            <p className="text-red-600">This pet is currently not avaliable for adoption. Please check back for later updates.</p>}
            
        </div>
    );
};

export default AdoptContent;
