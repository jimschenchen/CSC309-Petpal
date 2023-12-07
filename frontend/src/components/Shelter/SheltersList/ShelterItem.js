import { Link } from "react-router-dom";

const ShelterItem = ({shelter}) => {
    return (
        <Link to={`/shelter_detail/${shelter.id}`}>
      <div className="bg-white mb-6 rounded-lg shadow flex duration-300 hover:shadow-lg">
              <div className="flex-row items-center md:flex">
                  <div className="flex md:flex-initial">
                      <img src={shelter?.avatar} alt="shelter" className="w-28 h-auto md:w-48 md:h-auto rounded" />
                      <h1 className="flex items-center text-4xl font-bold ml-6 mr-6">{shelter?.name}</h1>
                  </div>
                  {/* <!-- Mission Statement --> */}
                  <div className="px-8 pt-2 md:px-4 md:flex-1">
                      <p className="text-xl font-bold mb-2">Description:</p>
                      <p className="text-base  mb-4">{shelter?.description}</p>
                  </div>
              </div>
  
          </div>
          </Link>
    );
  };
  
  export default ShelterItem;
  
