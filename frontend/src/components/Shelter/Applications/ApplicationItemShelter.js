import { useState } from "react";
import { Link } from "react-router-dom";

const ApplicationItemShelter = ({ Id, UserName, PetName, LastUpdate, Status }) => {
    return (
        <Link to={`/application/${Id}`} className="flex justify-between font-normal px-2 sm:px-4 py-2 sm:py-4 my-2 bg-white rounded-lg hover:bg-gray-100 hover:shadow-md ">
                      <div className="flex w-2/6 sm:w-1/3 justify-start">{UserName}</div>
                      <div className="flex w-3/6 sm:w-1/3 justify-start">{PetName}</div>
                      <div className="sm:w-1/3 sm:block hidden">{LastUpdate}</div>
                      <div className="sm:flex sm:w-1/3 sm:justify-center hidden">
                          {Status}
                      </div>
                      <div className="flex w-1/6  sm:w-1/3 justify-end"> 
                          <button className="bg-primary text-white text-sm hover:font-bold py-1 px-2 sm:px-4 sm:text-base rounded">Make Decision</button>
                      </div>
                  </Link>
        
    );
};

export default ApplicationItemShelter;