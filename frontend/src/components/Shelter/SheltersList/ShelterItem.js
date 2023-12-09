import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const ShelterItem = ({shelter}) => {
    console.log(shelter);
    return (
        <Link to={`/shelter_detail/${shelter.id}`}>
            <div className="bg-white mb-6 rounded-lg shadow flex duration-300 hover:shadow-lg">
              {/* <div className="flex-row items-center md:flex">
                  <div className="flex md:flex-initial">
                      <img src={shelter?.avatar} alt="shelter" className="w-28 h-auto md:w-48 md:h-auto rounded" />
                      <h1 className="flex items-center text-4xl font-bold ml-6 mr-6">{shelter?.name}</h1>
                  </div>
                  <!-- Mission Statement -->
                  <div className="px-8 pt-2 md:px-4 md:flex-1">
                      <p className="text-xl font-bold mb-2">Description:</p>
                      <p className="text-base  mb-4">{shelter?.description}</p>
                  </div>
              </div> */}

                <div className="h-[7rem] md:h-[10rem] w-full bg-white rounded-lg shadow flex duration-300 hover:shadow-lg">
                    <div className="w-full flex flex-row gap-3 items-center">
                        {shelter.avatar && 
                        <div className="w-1/4 h-full flex justify-center items-center">
                            <img src={shelter?.avatar} alt="shelter" className=" max-h-full max-w-full rounded"/>
                        </div>}

                        <div className="flex p-2 w-3/4 h-full gap-3 flex-col justify-center">
                            <h1 className="flex items-center text-lg md:text-4xl font-bold">
                                {shelter.name? shelter.name: `Shelter-${shelter.id}`}
                            </h1>
                            <p className="w-full break-normal flex flex-start text-left text-sm md:text-lg">
                                <Rating size="large" value={shelter.average_rating} precision={0.1} readOnly/>
                            </p>
                        </div>
                    </div>
                </div>
  
            </div>
        </Link>
    );
  };
  
  export default ShelterItem;
  
