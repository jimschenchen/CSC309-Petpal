import { useState } from "react";
import { Dialog } from "@mui/material";
import { getUser } from "../../../utils/credential";

const ApplicationBody = ({applicationData, petData, reloadApplication, setIsLoading}) => {
  const [open, setOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmClick = () => {
    if (!modalAction) {return;}
    var requestBody = {
      name: applicationData.name,
      email: applicationData.email,
      additional_information: applicationData.additional_information,
      pet: applicationData.pet,
      from_user: applicationData.from_user,
      to_user: applicationData.to_user
    }

    if (modalAction === 'accept') {
      requestBody.status = "Accepted";
    }
    else if (modalAction === 'decline') {
      requestBody.status = "Denied";
    }
    else if (modalAction === 'withdraw') {
      requestBody.status = 'Withdrawn';
    }
    else {return;}

    setIsLoading(true);
    fetch(`https://petpal.api.jimschenchen.com/applications/application/${applicationData.id}/`,
    {
      method: "PUT",
      headers:{
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${getUser().token}`
      },
      body: JSON.stringify(requestBody)
    }
    )
    .then(() => {reloadApplication();});
  }

  const DecisionPanel = () => {
    if (applicationData.status === 'Pending') {
      if (getUser().userType === 'shelter') {
        return(
          <div className="flex gap-2 mt-4">
              <button 
              className="bg-green-600 text-white hover:font-bold py-2 px-4 rounded"
              onClick={() => {setModalAction('accept'); setOpen(true);}}>
                    Accept
              </button>
              <button 
              className="bg-red-600 text-white hover:font-bold py-2 px-4 rounded"
              onClick={() => {setModalAction('decline'); setOpen(true)}}>
                    Decline
              </button>
          </div>
        );
      }
      else if (getUser().userType === 'seeker') {
        return (
          <div className="flex gap-2 mt-4">
              <button 
              className="bg-red-600 text-white hover:font-bold py-2 px-4 rounded"
              onClick={() => {setModalAction('withdraw'); setOpen(true)}}>
                    Withdraw
              </button>
          </div>
        )
      }
      else {return <></>}
    }
    else {return <></>}
  }

  return ( 
    <>
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

          <div className="border-b-2 border-black mb-5">
              <div className="font-bold text-xl ">Pet information</div>
              <div className="my-3 text-lg font-semibold">Name: <span className="font-normal">{petData.name}</span></div>
              <div className="my-3 text-lg font-semibold">Age: <span className="font-normal">{petData.age}</span></div>
              <div className="my-3 text-lg font-semibold">Breed: <span className="font-normal">{petData.breed}</span></div>
          </div>

          <div className="text-lg font-semibold">Current Status: 
          {applicationData.status==="Accepted" && <span className='font-normal text-green-600 mx-1'>{applicationData.status}</span>}
          {(applicationData.status==="Withdrawn" || applicationData.status==="Denied") && <span className='font-normal text-red-600 mx-1'>{applicationData.status}</span>}
          {applicationData.status==="Pending" && <span className='font-normal text-yellow-600 mx-1'>{applicationData.status}</span>}
          </div>
          <DecisionPanel/>
        </div>

        <Dialog open={open} onClose={handleClose}>
          <div className="px-4 py-2">
          <div className="text-lg">Confirm to {modalAction} this application?</div>

            <div className="flex gap-2 mt-4 right-0 justify-end">

              <button 
              className="text-green-600 hover:font-bold py-1 px-2"
              onClick={handleConfirmClick}>
                    Confirm
              </button>
              <button 
              className="text-red-600 hover:font-bold py-1 px-2"
              onClick={() => setOpen(false)}>
                    Cancel
              </button>
            </div>
          </div>
        
        </Dialog>
      </>
  );
}
 
export default ApplicationBody;