import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';


const ReviewCreation = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        const review = {name, description};
        navigate('/shelter_details');
        console.log(review);
    }
    return (
        <div class="container mx-auto p-8">
            <h2 class="text-2xl font-bold mb-4 text-center">Add review</h2>

            <form class="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
                {/* <!-- Pet Information Section --> */}
                <div class="mb-6">
                    <div>
                        <label for="name" class="block mb-1 font-bold">Name:</label>
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" class="w-full border rounded px-3 py-2"/>
                    </div>
                    <div>
                        <label for="description" class="block mb-1 font-bold">Content:</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} name="description" class="w-full border rounded px-3 py-2" rows="4"></textarea>
                    </div>
                </div>
                <div class="flex justify-between">
                    <button type="submit" class="bg-primary text-white hover:font-bold py-2 px-4 rounded">
                        Add
                    </button>
                    <Link to="/shelter_details" className="bg-primary text-white hover:font-bold py-2 px-4 rounded">
                        Back
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default ReviewCreation;