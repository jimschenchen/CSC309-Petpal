const ApplicationBody = () => {
    return ( 
        <div id='app-content' className="flex flex-col justify-between w-full -mt-1 h-[70vh] bg-[#EFEFEF] 
          rounded-b-lg p-8 sm:p-10">
            <div>
              <div className="font-bold text-xl">Applicant information</div>
              <div className="my-3 text-lg font-semibold">Name: <span className="font-normal">Sum Seeker</span></div>
              <div className="my-3 text-lg font-semibold">Email: <span className="font-normal">seeker@example.com</span></div>
              <div className="my-3 text-lg font-semibold">Phone: <span className="font-normal">(647)-135-246-7890</span></div>
              <div className="my-3 text-lg font-semibold">
                <div>Additional information:</div>
                <div className="font-normal">Cat is cute</div>
              </div>
            </div>
            
          </div>
    );
}
 
export default ApplicationBody;