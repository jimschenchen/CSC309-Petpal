import SendIcon from '@mui/icons-material/Send';
import { getUser } from '../../../utils/credential';
import { useEffect, useState, useRef } from 'react';
import Moment from 'react-moment';
import { CircularProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const [items, setItems] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);

  const [ hasMorePage, setHasMorePage ] = useState(true);

  // responsively set the number of messages per page
  // 1920 12msgPerPage
  var msgPerPage = 3 + window.innerWidth / 200;

  // load hidden items to items
  const loadHiddenItems = () => {
    if (hiddenItems.length > 0) {
      const nextItems = hiddenItems.slice(0, msgPerPage);
      setHiddenItems(hiddenItems.slice(msgPerPage));
      setItems(prev => [...prev, ...nextItems]);
    } else {
      setHasMorePage(false);
    }
  }

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
      for (let i = 0; i < data.results.length; i++) {
        arr.push(data.results[i]);
      }
      setItems(arr.slice(0, msgPerPage));
      setHiddenItems(arr.slice(msgPerPage));
      setIsLoading(false);
    });
  }, []);

  const sendHandle = () => {
    if (inputMessage.length == 0) {
      return;
    }
    setItems(prev => [{message: inputMessage, sender: getUser().userId, creation_time: Date.now()}, ...prev]);
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
      setItems(prev => [data, ...prev.slice(1)]);
      setIsSending(false);
    });
  }

  const fetchMoreMsg = () => {
    console.log(messages.current.scrollTop)
    // messages.current.scrollTop = messages.current.scrollTop - 40;
    setTimeout(() => {
      loadHiddenItems();
      // messages.current.scrollTop = messages.current.scrollTop - 40;
    }, 1500)
  }

  return (
      <div id='msg-content' className="flex flex-col justify-between w-full -mt-1 h-[70vh] max-h-[850px] bg-[#EFEFEF] 
        rounded-b-lg p-4 sm:p-10 border-seeker border-shelter">

        {/* <div ref={messages} className="w-full h-full flex flex-col gap-4 overflow-y-auto my-4">
          {items.map((comment, index) => (
              <MessageBlock key={index} data={comment}/>
          ))}
        </div> */}

        <div id="message" ref={messages} className="w-full h-full flex flex-col-reverse gap-4 overflow-y-scroll my-4">
          <div className='h-screen'>
          <InfiniteScroll
            className="w-full h-full flex flex-col-reverse gap-4 overflow-y-auto my-4 bottom-0"
            dataLength={items.length} //This is important field to render the next data
            next={fetchMoreMsg}
            hasMore={hasMorePage}
            scrollableTarget="message"
            loader={<div className="flex justify-center items-center basis-full p-4 text-black">
              <CircularProgress color='inherit'/>
            </div>}
            endMessage={<></>}
            inverse={true}
          >
            {!isLoading && items.map((comment, index) => (
                  <MessageBlock key={index} data={comment}/>
              ))}
            {isLoading && <center><CircularProgress color='inherit'/></center>}
          </InfiniteScroll>
          </div>
          
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