import { useState } from "react";

const Contact = ({shelter}) => {

    return (
        <div className="bg-white p-6 rounded-lg shadow duration-300 
         hover:bg-gray-100 hover:shadow-md hover:p-8 text-base">
            <div className="text-left">
                <strong>Location:</strong> {shelter?.address}
            </div>
            <div className="text-left">
                <strong>Phone:</strong> {shelter?.phone_number}
            </div>
            <div className="text-left">
                <strong>Email:</strong> {shelter?.email}
            </div>
        </div>
    );
};

export default Contact;
