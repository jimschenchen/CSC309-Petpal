import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { getUser } from "../../../utils/credential";


const CreatePet = () => {
    const [status, setStatus] = useState('available');
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [age, setAge] = useState();
    const [gender, setGender] = useState('');
    const [description, setDescription] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [behavior, setBehavior] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPet = {
            status,
            name,
            breed,
            color,
            size,
            age,
            gender,
            description,
            medical_history: medicalHistory,
            behavior,
        };

        try {
            // Make a POST request to create the pet
            console.log('newPet', newPet);
            const response = await fetch(`https://petpal.api.jimschenchen.com/pets/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getUser().token}`
                },
                body: JSON.stringify(newPet)
            });
            console.log('Pet added:', await response.json());
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response);

            // Redirect to the appropriate page after successful creation
            navigate('/manage_pets/');
        } catch (err) {
            console.error("Error creating pet:", err);
        }
    }
    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Create New Pet</h2>

            <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
                {/* <!-- Pet Information Section --> */}
                <div className="mb-6">
                    <div>
                        <label htmlFor="name" className="block mb-1 font-bold">Pet Name:</label>
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" className="w-full border rounded px-3 py-2"/>
                    </div>
                    <div>
                        <label htmlFor="breed" className="block mb-1 font-bold">Breed:</label>
                        <input type="text" required value={breed} onChange={(e) => setBreed(e.target.value)} id="breed" name="breed" className="w-full border rounded px-3 py-2"/>
                    </div>
                    <div>
                        <label htmlFor="color" className="block mb-1 font-bold">Color:</label>
                        <input type="text" required value={color} onChange={(e) => setColor(e.target.value)} id="color" name="color" min="0" className="w-full border rounded px-3 py-2"/>
                    </div>
                    <div>
                        <label htmlFor="age" className="block mb-1 font-bold">Age:</label>
                        <input type="number" required value={age} onChange={(e) => setAge(e.target.value)} id="age" name="age" min="0" className="w-full border rounded px-3 py-2"/>
                    </div>
                    <div>
                        <label htmlFor="size" className="block mb-1 font-bold">Size:</label>
                        <input type="text" required value={size} onChange={(e) => setSize(e.target.value)} id="size" name="size" className="w-full border rounded px-3 py-2"/>
                    </div>
                    <div>
                        <label htmlFor="gender" className="block mb-1 font-bold">Gender:</label>
                        <input type="text" required value={gender} onChange={(e) => setGender(e.target.value)} id="gender" name="gender" className="w-full border rounded px-3 py-2"/>
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-1 font-bold">Description:</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} name="description" className="w-full border rounded px-3 py-2" rows="4"></textarea>
                    </div>
                    <div>
                        <label htmlFor="medicalHistory" className="block mb-1 font-bold">Medical History:</label>
                        <textarea id="medicalHistory" value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)} name="medicalHistory" className="w-full border rounded px-3 py-2" rows="4"></textarea>
                    </div>
                    <div>
                        <label htmlFor="behavior" className="block mb-1 font-bold">Behavior:</label>
                        <textarea id="behavior" value={behavior} onChange={(e) => setBehavior(e.target.value)} name="behavior" className="w-full border rounded px-3 py-2" rows="4"></textarea>
                    </div>
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="bg-primary text-white hover:font-bold py-2 px-4 rounded">
                        Create
                    </button>
                    <Link to="/manage_pets" className="bg-primary text-white hover:font-bold py-2 px-4 rounded">
                        Back
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default CreatePet;