
const ShelterHeader = ({shelter}) => {
  return (
    <div className="bg-white mb-6 rounded-lg shadow flex duration-300 hover:shadow-lg">
            <div className="flex-row items-center md:flex">
                <div className="flex md:flex-initial">
                    <img src={shelter?.avatar} alt="shelter" className="w-28 h-28 md:w-48 md:h-48 rounded" />
                    <h1 className="flex items-center text-4xl font-bold mr-6">{shelter?.name}</h1>
                </div>
                {/* <!-- Mission Statement --> */}
                <div className="px-8 pt-2 md:px-4 md:flex-1">
                    <p className="text-xl font-bold mb-2">Mission Statement:</p>
                    <p className="text-base  mb-4">{shelter?.description}</p>
                </div>
            </div>

        </div>
  );
};

export default ShelterHeader;
