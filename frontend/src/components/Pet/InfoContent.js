

const InfoContent = ({ pet }) => {
    return (
        <div className="info-content">
            <div className="flex flex-col justify-between gap-3">
                <div className='flex gap-1 items-center'>
                <label className="font-bold">Name:</label>
                <p className="text-gray-800">{pet.Name}</p>
                </div>
                
                <div className='flex gap-1 items-center'>
                <label className="font-bold">Breed:</label>
                <p className="text-gray-800">{pet.Breed}</p>
                </div>
                
                <div className='flex gap-1 items-center'>
                <label className="font-bold">Age:</label>
                <p className="text-gray-800">{pet.Age}</p>
                </div>
                
                <div className='flex gap-1 items-center'>
                <label className="font-bold">Gender:</label>
                <p className="text-gray-800">{pet.Gender}</p>
                </div>
                
                <div className='flex gap-1 items-center'>
                <label className="font-bold">Size:</label>
                <p className="text-gray-800">{pet.Size}</p>
                </div>
                
            </div>
        </div>
    );
};

export default InfoContent;
