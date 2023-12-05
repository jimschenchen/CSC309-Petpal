import React, { useState } from 'react';
import Header from '../../components/Header'; // Adjust the import path as needed
import Footer from '../../components/Footer'; // Adjust the import path as needed
import { Link } from 'react-router-dom';

const SeekerAccountUpdate = () => {
    const [profilePicture, setProfilePicture] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');

    const handleProfilePictureChange = (event) => {
        // Handle profile picture change
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
        console.log({ profilePicture, name, email, phone, address, description });
    };

    return (
        <div className="bg-background">
            <Header userType={"seeker"} username={'user'}/>
            <main className="mt-0 p-0">
                <div className="container mx-auto p-8">
                    <h1 className="text-2xl font-bold mb-6 text-center">Pet Seeker Account Update</h1>

                    <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
                        {/* Profile Picture Upload */}
                        <div className="dm:flex dm:justify-between">
                            <div className="mb-4 dm:flex dm:items-center">
                                <div>
                                    <img src="/src/img/seeker-picture.png" alt="Profile Picture" className="w-32 h-32 mr-6 rounded" />
                                </div>
                                <div>
                                    <label htmlFor="profilePicture" className="block text-sm font-bold mb-2">Upload Profile Picture:</label>
                                    <input type="file" id="profilePicture" name="profilePicture" onChange={handleProfilePictureChange} />
                                </div>
                            </div>
                            <div className="flex items-center justify-end">
                                <Link to="/change-password-seeker" className="bg-primary text-white hover:font-bold py-2 px-4 rounded text-xs md:text-base">Change Password</Link>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-bold mb-2">Full Name:</label>
                            <input type="text" id="name" name="name" placeholder="Hanli" className="w-full px-3 py-2 border rounded-md" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div class="mb-4">
                    <label for="email" class="block text-sm font-bold mb-2">Email:</label>
                    <input type="email" id="email" name="email" placeholder="hhanli.jiang@mail.utoronto.ca"
                        class="w-full px-3 py-2 border rounded-md"/>
                </div>
                <div class="mb-4">
                    <label for="phone" class="block text-sm font-bold mb-2">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" placeholder="(123) 456-7890"
                        class="w-full px-3 py-2 border rounded-md"/>
                </div>

                <div class="mb-4">
                    <label for="address" class="block text-sm font-bold mb-2">Address:</label>
                    <textarea id="address" name="address" rows="3"
                        class="w-full px-3 py-2 border rounded-md"></textarea>
                </div>

                <div class="mb-4">
                    <label for="description" class="block text-sm font-bold mb-2">Description or Preference:</label>
                    <textarea id="description" name="description" rows="5"
                        class="w-full px-3 py-2 border rounded-md"></textarea>
                </div>

                        <button type="submit" className="bg-primary text-white hover:font-bold py-2 px-4 rounded">Update Account</button>
                    </form>
                </div>
            </main>
            <Footer userType={"seeker"}/>
        </div>
    );
};

export default SeekerAccountUpdate;
