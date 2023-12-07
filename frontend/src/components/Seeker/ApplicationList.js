import { useEffect, useState } from "react";
import ApplicationItemSeeker from "./ApplicationItemSeeker";
import { getUser } from "../../utils/credential";
import useFetchGet from "../../utils/useFetch";

const ManageApplication = () => {
    const [applications, setApplications] = useState([]);
    const {data, isLoading, error} = useFetchGet(`applications/`);
    const userId = getUser().userId;

    useEffect(() => {
      if (data && !isLoading) {
        // Map through the applications and format the last_updated_time
        const formattedApplications = data.results.map(app => ({
            ...app,
            last_updated_time: app.last_updated_time.split('T')[0] // Extracts only the date part
        }));
        setApplications(formattedApplications);
        console.log(applications);
      }
    }, [data, isLoading]);
    return (
        
        <main className="mt-0 py-6 px-2">
      {/* <!-- Shelter Management Header --> */}

      {/* <!-- Application Management --> */}
      <section>


          {/* <!-- Example Applications (This would be looped or mapped in a real-world scenario) --> */}
          <div className="flex justify-center items-center">
              {/* <!-- Table --> */}
              <div className="flex mx-3 w-full max-w-[800px] bg-background flex-col">
                  <div className="font-bold text-xl my-3 mx-3 left-0">My Applications</div>
      
      
                  {/* <!-- table head --> */}
                  <div className="flex justify-between font-semibold border-b-2 border-black px-3 py-1">
                      <div className="flex w-2/6 sm:w-1/3 justify-start">Pet name</div>
                      <div className="sm:w-1/3 sm:block hidden">Last update</div>
                      <div className="sm:flex sm:w-1/3 sm:justify-center hidden">Status</div>
                  </div>
      
                  {/* <!-- table row --> */}
                  {applications.map(application => (
              <ApplicationItemSeeker ID={application.id} PetName={application.pet} LastUpdate={application.last_updated_time} Status={application.status}/>
            ))}
              </div> 
            </div>
      </section>

  </main>

    );
};

export default ManageApplication;