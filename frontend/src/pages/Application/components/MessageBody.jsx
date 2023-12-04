import SendIcon from '@mui/icons-material/Send';

const MessageBody = () => {
    return (
        <div id='msg-content' className="flex flex-col justify-between w-full -mt-1 h-[70vh] bg-[#EFEFEF] 
          rounded-b-lg p-4 sm:p-10">
          <div className="w-full h-full flex flex-col gap-4">
            <div className='w-full flex justify-end'>
              <div className="bg-white h-max w-max p-2 rounded-lg border-shelter border-2 ml-4"> 
                Hello! Thank you for your interest in adopting Tom.
              </div>
            </div>
            <div className='w-full flex justify-start'>
              <div className="bg-white h-max w-max p-2 rounded-lg border-seeker border-2 mr-4"> 
                User Seeker: Thank you!
              </div>
            </div>
            
          </div>
            
            <div className="flex justify-end items-center gap-2">
              <input type="text" className="w-full border-black border-2 px-2 py-2 rounded-sm" />
              <button className="material-icons text-primary">
                <SendIcon/>
              </button>
            </div>
            
          </div>
    );
}
 
export default MessageBody