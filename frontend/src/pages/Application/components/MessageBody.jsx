import SendIcon from '@mui/icons-material/Send';

const MessageBlock = ({message, sender}) => {
  const user_id = 1;
  const userType = 'seeker';

  const getOtherUserType = (userType) => {
    return (userType === 'seeker'? 'shelter': 'seeker')
  } 

  const borderClass = () => {
    if (sender === user_id) {
      return `border-${userType}`;
    }
    else {
      return `border-${getOtherUserType(userType)}`;
    }
  }

  if (sender === user_id){
    return (
      <div className='w-full flex justify-end'>
        <div className={"bg-white h-max w-max p-2 rounded-lg border-2 ml-4 " + borderClass()}> 
          {message}
        </div>
      </div>
    );
  }
  else {
    return (
      <div className='w-full flex justify-start'>
        <div 
        className={"bg-white h-max w-max p-2 rounded-lg border-2 mr-4 " + borderClass()}> 
          {message}
        </div>
      </div>
    )
  }
  
}

const MessageBody = () => {
    return (
        <div id='msg-content' className="flex flex-col justify-between w-full -mt-1 h-[70vh] bg-[#EFEFEF] 
          rounded-b-lg p-4 sm:p-10">
          <div className="w-full h-full flex flex-col gap-4">
            <MessageBlock message={"Hello! Thank you for your interest in adopting Tom."}
            sender={1}/>
            <MessageBlock message={"Thank you!"} sender={2}/>
            
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