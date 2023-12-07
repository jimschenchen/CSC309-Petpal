import SendIcon from '@mui/icons-material/Send';
import { getUser } from '../../../utils/credential';
import { useEffect, useState, useRef } from 'react';
import Moment from 'react-moment';

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

  // const time = () => {
  //   return moment.utc(data.creation_time).local().startOf('seconds').fromNow();
  // }

  if (data.sender === userId){
    return (
      <div className='w-full flex justify-end'>
        <div className={`flex gap-2 bg-white h-max w-max p-2 rounded-lg border-2 ml-4 ${borderClass()}`}> 
          <div>{data.message}</div>
          <Moment date={data.creation_time} format='MM-DD hh:mm' className='h-full text-xs text-right pt-2'/>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className='w-full flex justify-start'>
        <div className={`flex gap-2 bg-white h-max w-max p-2 rounded-lg border-2 mr-4 ${borderClass()}`}> 
          <div> {data.message} </div>
        <Moment date={data.creation_time} format='MM-DD hh:mm' className='h-full text-xs text-right pt-2'/>

        </div>
      </div>
    )
  }
  
}

const MessageBody = ({commentData}) => {
  const arr = [];
  for (let i = commentData.results.length - 1; i > -1; i--) {
    arr.push(commentData.results[i]);
  }
  const [items, setItems] = useState(arr);
  const messages = useRef();

  useEffect(() => {
    console.log(messages.current.height);
    messages.current.scrollTop = messages.current.scrollHeight;
  })

  console.log(items);
  return (
      <div id='msg-content' className="flex flex-col justify-between w-full -mt-1 h-[70vh] bg-[#EFEFEF] 
        rounded-b-lg p-4 sm:p-10">
        <div ref={messages} className="w-full h-full flex flex-col gap-4 overflow-y-auto my-4">
        { items.map((comment, index) => (
              <MessageBlock key={index} data={comment}/>
          ))}
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