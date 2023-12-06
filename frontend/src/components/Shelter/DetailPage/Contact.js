import { useState } from "react";

const Contact = ({shelter}) => {

    return (
        <div className="bg-white p-6 rounded-lg shadow duration-300 hover:bg-gray-100 hover:shadow-md hover:p-8">
            <h2 className="text-2xl font-bold mb-4">Contact & Location</h2>
            <div>
                <strong>Location:</strong> {shelter?.address}
            </div>
            <div>
                <strong>Phone:</strong> {shelter?.phone_number}
            </div>
            <div>
                <strong>Email:</strong> {shelter?.email}
            </div>
        </div>
    );
};

export default Contact;
