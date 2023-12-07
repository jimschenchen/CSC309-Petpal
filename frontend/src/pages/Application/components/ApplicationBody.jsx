const ApplicationBody = ({applicationData, petData}) => {
  return ( 
      <div id='app-content' className="justify-between w-full -mt-1 h-[70vh] bg-[#EFEFEF] 
        rounded-b-lg p-8 sm:p-10">
          <div className="border-b-2 border-black mb-5">
              <div className="font-bold text-xl">Applicant information</div>
              <div className="my-3 text-lg font-semibold">Name: <span className="font-normal">{applicationData.name}</span></div>
              <div className="my-3 text-lg font-semibold">Email: <span className="font-normal">{applicationData.email}</span></div>
              <div className="my-3 text-lg font-semibold">
                <div>Additional information:</div>
                {applicationData.additional_information === '' && <div className="">No further information</div>}
                {applicationData.additional_information !== '' && <div className="font-normal">{applicationData.additional_information}</div>}
              </div>
          </div>

          <div className="">
              <div className="font-bold text-xl">Pet information</div>
              <div className="my-3 text-lg font-semibold">Name: <span className="font-normal">{petData.name}</span></div>
              <div className="my-3 text-lg font-semibold">Age: <span className="font-normal">{petData.age}</span></div>
              <div className="my-3 text-lg font-semibold">Breed: <span className="font-normal">{petData.breed}</span></div>
          </div>
          
        </div>
  );
}
 
export default ApplicationBody;