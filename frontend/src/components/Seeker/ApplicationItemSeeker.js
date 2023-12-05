import { useState } from "react";

const ApplicationItemSeeker = ({ UserName, PetName, LastUpdate, Status }) => {
    return (
        <a href="shelter-application-detail.html" class="flex justify-between font-normal px-2 sm:px-4 py-2 sm:py-4 my-2 bg-white rounded-lg hover:bg-gray-100 hover:shadow-md ">
                      <div class="flex w-3/6 sm:w-1/3 justify-start">{PetName}</div>
                      <div class="sm:w-1/3 sm:block hidden">{LastUpdate}</div>
                      <div class="sm:flex sm:w-1/3 sm:justify-center hidden">
                          {Status}
                      </div>
                  </a>
        
    );
};

export default ApplicationItemSeeker;