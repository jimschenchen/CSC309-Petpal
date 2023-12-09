
const ShelterHeader = ({shelter}) => {
    console.log(shelter)
  return (
    <div className="h-[7rem] md:h-[10rem] bg-white rounded-lg shadow flex duration-300 hover:shadow-lg">
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
                    {shelter?.description}
                </p>
            </div>
        </div>
    </div>
  );
};

export default ShelterHeader;
