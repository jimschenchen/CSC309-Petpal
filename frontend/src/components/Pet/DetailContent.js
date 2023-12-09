

const DetailContent = ({ pet }) => {
    console.log(pet);
    return (
        <div className="detail-active-page lg:w-4/5">
            
            <div className="mb-4">
                <label className="font-bold">Description:</label>
                <p className="text-gray-800">
                    {pet.description? pet.description: "The shelter did not provide this information."}
                </p>
            </div>

            <div className="mb-4">
                <label className="font-bold">Medical History:</label>
                <p className="text-gray-800">
                    {pet.medical_history? pet.medical_history: "The shelter did not provide this information."}
                </p>
            </div>

            <div className="mb-4">
                <label className="font-bold">Behavior:</label>
                <p className="text-gray-800">
                    {pet.behavior? pet.behavior: "The shelter did not provide this information."}
                </p>
            </div>
        </div>
    );
};

export default DetailContent;
