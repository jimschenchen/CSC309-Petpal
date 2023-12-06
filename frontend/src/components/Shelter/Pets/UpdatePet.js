import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Request } from "../../../utils/Request";

const UpdatePet = () => {

    

    const { petId } = useParams();
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [color, setColor] = useState('');
    const [age, setAge] = useState('');
    const [size, setSize] = useState('');
    const [gender, setGender] = useState('');
    const [description, setDescription] = useState('');
    const [medicalH, setMedicalH] = useState('');
    const [behavior, setBehavior] = useState('');
    const [status, setStatus] = useState('');

  const getPet = async () => {
    try {
      const res = await Request(`/pets/pet/${petId}`, "GET");
      console.log(res);
      setStatus(res?.status);
      setName(res?.name);
      setColor(res?.color);
      setBreed(res?.breed);
      setAge(res?.age);
      setSize(res?.size);
      setGender(res?.gender);
      setDescription(res?.description);
      setMedicalH(res?.medical_history);
      setBehavior(res?.behavior);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPet();
  }, [petId])

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Construct the updated pet data object
        const updatedPet = {
            status,
            name,
            breed,
            color,
            size,
            age,
            gender,
            description,
            medical_history: medicalH,
            behavior,
        };
        console.log(updatedPet);
    
        try {
            // Make a PUT request to update the pet
            const response = await Request(`/pets/pet/${petId}`, "PUT", updatedPet );
            console.log(response);
    
            // Redirect to manage_pets page after successful update
            navigate('/manage_pets');
        } catch (err) {
            console.error("Error updating pet:", err);
        }
    };

    return (
        <div class="container mx-auto p-8">
            <h2 class="text-2xl font-bold mb-4 text-center">Update Pet</h2>

            <form class="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
                {/* <!-- Pet Information Section --> */}
                <div class="mb-6">
                    <div>
                        <label for="name" class="block mb-1 font-bold">Pet Name:</label>
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" class="w-full border rounded px-3 py-2"/>
                    </div>
                    <div>
                        <label for="breed" class="block mb-1 font-bold">Breed:</label>
                        <input type="text" required value={breed} onChange={(e) => setBreed(e.target.value)} id="breed" name="breed" class="w-full border rounded px-3 py-2"/>
                    </div>
                    <div>
                        <label for="color" class="block mb-1 font-bold">Color:</label>
                        <input type="text" required value={color} onChange={(e) => setColor(e.target.value)} id="color" name="color" class="w-full border rounded px-3 py-2"/>
                    </div>
                    <div>
                        <label for="size" class="block mb-1 font-bold">Size:</label>
                        <input type="text" required value={size} onChange={(e) => setSize(e.target.value)} id="size" name="size" class="w-full border rounded px-3 py-2"/>
                    </div>
                    <div>
                        <label for="age" class="block mb-1 font-bold">Age:</label>
                        <input type="number" required value={age} onChange={(e) => setAge(e.target.value)} id="age" name="age" min="0" class="w-full border rounded px-3 py-2"/>
                    </div>
                    <div>
                        <label for="gender" class="block mb-1 font-bold">Gender:</label>
                        <input type="text" required value={gender} onChange={(e) => setGender(e.target.value)} id="gender" name="gender" class="w-full border rounded px-3 py-2"/>
                    </div>
                    <div>
                        <label for="status" class="block mb-1 font-bold">Status:</label>
                        <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} id="status" name="status" class="w-full border rounded px-3 py-2"/>
                    </div>
                    <div>
                        <label for="description" class="block mb-1 font-bold">Description:</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} name="description" class="w-full border rounded px-3 py-2" rows="4"></textarea>
                    </div>
                    <div>
                        <label for="medical_history" class="block mb-1 font-bold">Medical History:</label>
                        <textarea id="medical_history" value={medicalH} onChange={(e) => setMedicalH(e.target.value)} name="medicalH" class="w-full border rounded px-3 py-2" rows="4"></textarea>
                    </div>
                    <div>
                        <label for="behavior" class="block mb-1 font-bold">Behavior:</label>
                        <textarea id="behavior" value={behavior} onChange={(e) => setBehavior(e.target.value)} name="behavior" class="w-full border rounded px-3 py-2" rows="4"></textarea>
                    </div>
                </div>
                <div class="flex justify-between">
                    <button type="submit" class="bg-primary text-white hover:font-bold py-2 px-4 rounded">
                        Update
                    </button>
                    <Link to="/manage_pets" className="bg-primary text-white hover:font-bold py-2 px-4 rounded">
                        Back
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default UpdatePet;