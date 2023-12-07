import { useState } from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import { getUser } from "../../../utils/credential";


const ReviewCreation = () => {
    const { shelterId } = useParams();
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const review = {
            message: description 
        };

        try {
            const response = await fetch(`https://petpal.api.jimschenchen.com/comments/shelter/${shelterId}/comments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getUser().token}` // Add token from getUser() if authentication is needed
                },
                body: JSON.stringify(review)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Handle the response here
            console.log('Review added:', await response.json());
            navigate(`/shelter_detail/${shelterId}`);
        } catch (error) {
            console.error('Error during review creation:', error);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Add review</h2>

            <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
                {/* <!-- Pet Information Section --> */}
                <div className="mb-6">
                    <div>
                        <label htmlFor="description" className="block mb-1 font-bold">Content:</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} name="description" className="w-full border rounded px-3 py-2" rows="4"></textarea>
                    </div>
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="bg-primary text-white hover:font-bold py-2 px-4 rounded">
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