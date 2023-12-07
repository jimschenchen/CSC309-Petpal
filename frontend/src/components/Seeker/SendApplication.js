import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { getUser } from "../../utils/credential";


const SendApplication = ({pet}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [information, setInformation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newApplication = {
            name,
            email,
            additional_information: information,
            pet:pet.id,
        };

        try {
            // Make a POST request to create the pet
            console.log('newApplication', newApplication);
            const response = await fetch(`https://petpal.api.jimschenchen.com/applications/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getUser().token}`
                },
                body: JSON.stringify(newApplication)
            });
            console.log('Application sent:', await response.json());
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response);

            // Redirect to the appropriate page after successful creation
            navigate('/my_applications/');
        } catch (err) {
            console.error("Error creating pet:", err);
        }
    }
    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Adoption Application</h2>

            <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
                {/* <!-- Pet Information Section --> */}
                <div className="mb-6">
                    <div>
                        <label htmlFor="name" className="block mb-1 font-bold">Name:</label>
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" className="w-full border rounded px-3 py-2"/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1 font-bold">Email:</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" className="w-full border rounded px-3 py-2"/>
                    </div>
                    <div>
                        <label htmlFor="information" className="block mb-1 font-bold">Additional Information:</label>
                        <textarea id="information" value={information} onChange={(e) => setInformation(e.target.value)} name="information" className="w-full border rounded px-3 py-2" rows="4"></textarea>
                    </div>
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="bg-primary text-white hover:font-bold py-2 px-4 rounded">
                        Submit
                    </button>
                    <Link to="/shelter_details" className="bg-primary text-white hover:font-bold py-2 px-4 rounded">
                        Back
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default SendApplication;