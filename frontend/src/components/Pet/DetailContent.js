

const DetailContent = ({ pet }) => {
    return (
        <div>
            
            <div className="mb-4">
                <label className="font-bold">Description:</label>
                <p className="text-gray-800">{pet.description}</p>
            </div>

            <div className="mb-4">
                <label className="font-bold">Medical History:</label>
                <p className="text-gray-800">{pet.description}</p>
            </div>

            <div className="mb-4">
                <label className="font-bold">Behavior:</label>
                <p className="text-gray-800">{pet.description}</p>
            </div>
        </div>
    );
};

export default DetailContent;
