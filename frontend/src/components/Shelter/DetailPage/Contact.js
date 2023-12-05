import { useState } from "react";

const Contact = (props) => {
    const shelterInfo = props.shelter[0];

    return (
        <div className="bg-white p-6 rounded-lg shadow duration-300 hover:bg-gray-100 hover:shadow-md hover:p-8">
            <h2 className="text-2xl font-bold mb-4">Contact & Location</h2>
            <div>
                <strong>Location:</strong> {shelterInfo.location}
            </div>
            <div>
                <strong>Phone:</strong> {shelterInfo.phone}
            </div>
            <div>
                <strong>Email:</strong> {shelterInfo.email}
            </div>
        </div>
    );
};

export default Contact;
