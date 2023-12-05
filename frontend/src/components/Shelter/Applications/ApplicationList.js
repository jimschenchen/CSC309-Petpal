import { useState } from "react";
import ApplicationItemSeeker from "./ApplicationItemSeeker";

const ManageApplication = () => {
    const [applications, setApplications] = useState([

        { id: 1, PetName: 'Tom (P192837)', LastUpdate: '2023-09-30', Status: 'pending'},
    
      ]);

    return (
        
        <main class="mt-0 py-6 px-2">
      {/* <!-- Shelter Management Header --> */}

      {/* <!-- Application Management --> */}
      <section>


          {/* <!-- Example Applications (This would be looped or mapped in a real-world scenario) --> */}
          <div class="flex justify-center items-center">
              {/* <!-- Table --> */}
              <div class="flex mx-3 w-full max-w-[800px] bg-background flex-col">
                  <div class="font-bold text-xl my-3 mx-3 left-0">My Applications</div>
      
      
                  {/* <!-- table head --> */}
                  <div class="flex justify-between font-semibold border-b-2 border-black px-3 py-1">
                      <div class="flex w-2/6 sm:w-1/3 justify-start">Pet name</div>
                      <div class="sm:w-1/3 sm:block hidden">Last update</div>
                      <div class="sm:flex sm:w-1/3 sm:justify-center hidden">Status</div>
                  </div>
      
                  {/* <!-- table row --> */}
                  {applications.map(application => (
              <ApplicationItemSeeker key={application.id} PetName={application.PetName} LastUpdate={application.LastUpdate} Status={application.Status}/>
            ))}
              </div> 
            </div>
      </section>

  </main>

    );
};

export default ManageApplication;