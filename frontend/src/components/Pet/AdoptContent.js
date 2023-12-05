
const AdoptContent = ({ pet, onAdoptClick }) => {
    return (
        <div className="adopt-content">
            {/* Shelter and adoption status */}
            <div>
                <div class="font-bold">Shelter:</div>
                <a href="shelter-detail-public.html" class="text-primary hover:underline">Visit shelter page</a>
            </div>
            <div className="mb-4 gap-3">
                <label className="font-bold">Adoption Status:</label>
                <p className="text-green-600">{pet.Status}</p>
            </div>
            <button onClick={onAdoptClick} className="bg-primary text-white hover:font-bold py-2 px-4 rounded">
                Adopt {pet.name}
            </button>
        </div>
    );
};

export default AdoptContent;
