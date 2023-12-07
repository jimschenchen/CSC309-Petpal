import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';


const SendApplication = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [information, setInformation] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        const application = {name, email, phone, information};
        navigate('/shelter_details');
        console.log(application);
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
                        <label htmlFor="phone" className="block mb-1 font-bold">Phone:</label>
                        <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" name="phone" className="w-full border rounded px-3 py-2"/>
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