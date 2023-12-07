import { Link } from "react-router-dom";

const NotFound = () => {
    return (
    <div className="w-full h-full bg-sencond_background">
        <Link to='/' className="flex justify-between items-center mt-10">
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

        <div className=" z-10 flex flex-col justify-center items-center w-full mt-3">
            <div className="bg-background p-4 rounded-lg">
            <h1 className="text-bold">Error 404</h1>
            <p>Your requested page is not NotFound. Please double check the URL and try again.</p>
            </div>
            
        </div>
    </div>);
}

export default NotFound;