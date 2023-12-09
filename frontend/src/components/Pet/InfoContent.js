

const InfoContent = ({ pet }) => {
    return (
        <div className="info-content detail-active-page lg:w-4/5">
            <div className="flex flex-col justify-between gap-3">
                <div className='flex gap-1 items-center'>
                <label className="font-bold">Name:</label>
                <p className="text-gray-800">{pet.name}</p>
                </div>
                
                <div className='flex gap-1 items-center'>
                <label className="font-bold">Breed:</label>
                <p className="text-gray-800">{pet.breed}</p>
                </div>
                
                <div className='flex gap-1 items-center'>
                <label className="font-bold">Age:</label>
                <p className="text-gray-800">{pet.age} year</p>
                </div>
                
                <div className='flex gap-1 items-center'>
                <label className="font-bold">Gender:</label>
                <p className="text-gray-800">{pet.gender}</p>
                </div>
                
                <div className='flex gap-1 items-center'>
                <label className="font-bold">Size:</label>
                <p className="text-gray-800">{pet.size}</p>
                </div>
                
            </div>
        </div>
    );
};

export default InfoContent;
