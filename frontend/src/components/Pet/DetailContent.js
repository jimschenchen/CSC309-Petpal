

const DetailContent = ({ pet }) => {
    return (
        <div className="detail-content">
            {/* Description*/}
            <div className="mb-4">
                <label className="font-bold">Description:</label>
                <p className="text-gray-800">{pet.description}</p>
            </div>
            {/* ... other details ... */}
        </div>
    );
};

export default DetailContent;
