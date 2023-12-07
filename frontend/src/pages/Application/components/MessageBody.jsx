import SendIcon from '@mui/icons-material/Send';
import { getUser } from '../../../utils/credential';
import { useEffect, useState, useRef } from 'react';
import Moment from 'react-moment';
import { CircularProgress } from '@mui/material';

const MessageBlock = ({data}) => {
  const userId = getUser().userId;
  const userType = getUser().userType;

  const getOtherUserType = () => {
    return (userType === 'seeker'? 'shelter': 'seeker')
  } 

  const borderClass = () => {
    if (data.sender === userId) {
      return `border-${userType}`;
    }
    else {
      return `border-${getOtherUserType(userType)}`;
    }
  }

  if (data.sender === userId){
    return (
      <div className='w-full flex justify-end'>
        <div className={`flex gap-2 bg-white h-max w-max p-2 rounded-lg border-2 ml-4 ${borderClass()}`}> 
          <div>{data.message}</div>
          <Moment date={data.creation_time} format='MMM DD, hh:mm' className='text-gray-500 h-full text-xs text-right pt-2'/>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className='w-full flex justify-start'>
        <div className={`flex gap-2 bg-white h-max w-max p-2 rounded-lg border-2 mr-4 ${borderClass()}`}> 
          <div> {data.message} </div>
        <Moment date={data.creation_time} format='MMM DD, hh:mm' className='text-gray-500 h-full text-xs text-right pt-2'/>

        </div>
      </div>
    )
  }
  
}

const MessageBody = ({applicationId}) => {
  const [items, setItems] = useState(null);
  const messages = useRef();
  const [inputMessage, setInputMessage] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    messages.current.scrollTop = messages.current.scrollHeight;
  }, []);

  useEffect(() => {
    // fetch message data
    fetch(
      `https://petpal.api.jimschenchen.com/comments/application/${applicationId}/comments/`,
      {
          method: "GET", 
          headers:{
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${getUser().token}`
          }
      }
    )
    .then(res => res.json())
    .then(data => {
      const arr = [];
      for (let i = data.results.length - 1; i > -1; i--) {
        arr.push(data.results[i]);
      }
      setItems(arr);
      setIsLoading(false);
    });
  }, []);

  const sendHandle = () => {
    if (inputMessage.length == 0) {
      return;
    }
    setItems(prev => [...prev, 
      {message: inputMessage, sender: getUser().userId, creation_time: Date.now()}]);
    setIsSending(true);
    fetch(`https://petpal.api.jimschenchen.com/comments/application/${applicationId}/comments/`, 
    {
      method: "POST",
      headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${getUser().token}`},
      body: JSON.stringify({message: inputMessage})
    }
    )
    .then(res => res.json())
    .then(data => {
      setInputMessage('');
      setItems(prev => [...prev.slice(0,-1), data]);
      setIsSending(false);
    });
  }

  return (
      <div id='msg-content' className="flex flex-col justify-between w-full -mt-1 h-[70vh] bg-[#EFEFEF] 
        rounded-b-lg p-4 sm:p-10 border-seeker border-shelter">
        <div ref={messages} className="w-full h-full flex flex-col gap-4 overflow-y-auto my-4">
        {!isLoading && items.map((comment, index) => (
              <MessageBlock key={index} data={comment}/>
          ))}
        {isLoading && <center><CircularProgress color='inherit'/></center>}
        </div>
          
          <div className="flex justify-end items-center gap-2">
            <input type="text" 
            className="w-full ring-2 ring-black px-2 py-2 rounded-sm 
            focus:ring-primary focus:outline-none focus:border-0 focus:ring-2" 
            value={inputMessage}
            onChange={(e) => {if(isSending) {return;} setInputMessage(e.target.value)}}/>
            <div className='w-10 h-full flex align-middle justify-center'>
            {isSending && <div className='text-primary pt-2'><CircularProgress color='inherit' size={20}/></div>}
            {!isSending && <button className="material-icons text-primary hover:scale-110"
            onClick={sendHandle}>
              <SendIcon/>
            </button>}
            </div>
            
          </div>
        </div>
  );
}
 
export default MessageBody