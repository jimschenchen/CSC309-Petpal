import { useState } from "react";

const ApplicationItem = ({ UserName, PetName, LastUpdate, Status }) => {
    return (
        <a href="shelter-application-detail.html" class="flex justify-between font-normal px-2 sm:px-4 py-2 sm:py-4 my-2 bg-white rounded-lg hover:bg-gray-100 hover:shadow-md ">
                      <div class="flex w-2/6 sm:w-1/3 justify-start">{UserName}</div>
                      <div class="flex w-3/6 sm:w-1/3 justify-start">{PetName}</div>
                      <div class="sm:w-1/3 sm:block hidden">{LastUpdate}</div>
                      <div class="sm:flex sm:w-1/3 sm:justify-center hidden">
                          {Status}
                      </div>
                      <div class="flex w-1/6  sm:w-1/3 justify-end"> 
                          <button class="bg-primary text-white text-sm hover:font-bold py-1 px-2 sm:px-4 sm:text-base rounded">Make Decision</button>
                      </div>
                  </a>
        
    );
};

export default ApplicationItem;