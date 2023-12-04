import { Link } from "react-router-dom";

const AuthLogo = () => {
    return ( 
    <Link className="flex justify-between items-center mt-10">
        <div className="w-full">
            <div className="flex justify-end items-center">
                <img src={process.env.PUBLIC_URL + '/logo.svg'} alt="logo" className="h-12 sm:h-16"/>     
            </div>
        </div>

        <div>
            <div className="flex justify-center items-center">
                <span className="self-center text-3xl font-extrabold text-white">PetPal</span>
            </div>
        </div>
        <div className="w-full"></div>
    </Link>
    );
}
 
export default AuthLogo;