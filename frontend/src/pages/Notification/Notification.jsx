import PageFrame from "../../components/PageFrame";
import SmsIcon from '@mui/icons-material/Sms';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from "react-router-dom";
import useFetchGet from "../../utils/useFetch";
import { getUser } from "../../utils/credential";
import moment from 'moment';
import { useEffect, useState } from "react";
import zIndex from "@mui/material/styles/zIndex";
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from "@mui/material";

const NotificationCard = ({notification, index, setItems}) => {
    const navigate = useNavigate();
    const userType = getUser().userType;
    const icon_color = () => {
        return (userType === 'seeker'? "text-primary": "text-shelter");
    }

    const Icon = () => {
        switch (notification.content_object.type){
            case 'application':
                return <EditNoteIcon className={icon_color()}/>
            case 'comment-application':
                return <SmsIcon className={icon_color()}/>
            case 'comment-shelter':
                return <CommentIcon className={icon_color()}/>
        }
    }

    // const getUrl = () => {
    //     switch (notification.content_object.type){
    //         case 'application':
    //             return `/application/${notification.application_id}`
    //         case 'comment-application':
    //             return ``
    //         case 'comment-shelter':
    //             return <CommentIcon className={icon_color()}/>
    //     }
    // }
    // console.log(notification);

    const message = () => {
        switch(notification.content_object.type) {
            case 'application':
                switch(notification.action_code) {
                    case 'U':
                        return `Application for ${notification.content_object.pet_name} is updated`;
                    case 'C':
                        return `New application for ${notification.content_object.pet_name}`;        
                }
            case 'comment-application':
                return `New message from the application of ${notification.content_object.pet_name}`;
            case 'comment-shelter':
                return `You received a comment`;
            default:
                return 'New notification';
        }
    }

    const time = () => {
        return moment.utc(notification.creation_time).local().startOf('seconds').fromNow();
    }
    return (
        <div className="flex justify-between bg-white rounded-lg px-2 sm:px-4 py-2 sm:py-4 my-1 duration-300 white-card-hover">
            <button className="flex justify-start gap-2" 
            onClick={() => {
                fetch(`https://petpal.api.jimschenchen.com/notifications/notification/${notification.id}/`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getUser().token}`
                        } 
                    }).then(res => res.json())
                    .then(data => console.log(data));
            }}>
                <Icon/>
                <div className="font-normal hover:underline">{message()}</div>
            </button>
            <div className="flex justify-end font-light gap-1">
                <div className="text-xs text-right h-fit" >{time()}</div>
                <button onClick={ () => {
                    setItems((prev) => {
                        var arr = [];
                        for (let i = 0; i < prev.length; i++) {
                            if (i != index) {
                                arr.push(prev[i]);
                            }
                        }
                        return arr
                    });
                    fetch(`https://petpal.api.jimschenchen.com/notifications/notification/${notification.id}/`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getUser().token}`
                        } 
                    });
                }}> <CloseIcon/> </button>
            </div>
            
        </div>
    );
}

const Notification = () => {
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [nextPageNum, setNextPageNum] = useState(1);

    const [filter, setFilter] = useState('unread');

    const getUrl = () => {
        const page_size = 10;
        if (filter === 'unread') {
            return `https://petpal.api.jimschenchen.com/notifications/?is_read=0&page_size=${page_size}&page=${nextPageNum}`;
        }
        else if (filter === 'read') {
            return `https://petpal.api.jimschenchen.com/notifications/?is_read=1&page_size=${page_size}&page=${nextPageNum}`;
        }
        else {
            return `https://petpal.api.jimschenchen.com/notifications/?page_size=${page_size}&page=${nextPageNum}`;
        }
    }

    useEffect (() => {
        fetch(getUrl(), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getUser().token}`
            }  
        }).then(res => {
            if (!res.ok) {
                throw Error('Could not fetch notifications');
            }
            return res.json()
        }).then(data => {
            setItems(data.results);
            if (data.next) {
                setHasMore(true);
                setNextPageNum(2);
            }
            else {
                setHasMore(false);
            }
        });
    }, [filter]);
    
    const fetchData = () => {
        fetch(getUrl(), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getUser().token}`
            }  
        }).then(res => {
            if (!res.ok) {
                throw Error('Could not fetch notifications');
            }
            return res.json()
        }).then(data => {
            setItems((prev) => [...prev, ...data.results]);
            if (data.next) {
                setHasMore(true);
                setNextPageNum(prev => prev+1);
            }
            else {
                setHasMore(false);
            }
        });
    }
    

    return (
        <PageFrame requiredLogin={true}>
            <div className="flex justify-center items-center">
                <div className="scroll-my-3 flex mx-3 w-full h-full max-w-[800px] bg-background flex-col">
                    <div className="my-3 mx-3 flex justify-between">
                        <div className="font-bold text-2xl">Notifications</div>
                        <select onChange={(e) => {
                                setItems([]);
                                setNextPageNum(1);
                                setHasMore(true);
                                setFilter(e.target.value)
                            }} className="rounded-lg focus:ring-primary focus:outline-none focus:ring-1 px-2 py-1">
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                            <option value="all">All</option>
                        </select>
                    </div>
                    <div id="scroll" className="overflow-y-auto h-[calc(100vh-9rem)] no-scrollbar">
                        <div className="h-screen">

                    <InfiniteScroll
                    dataLength={items.length}
                    next={fetchData}
                    hasMore={hasMore}
                    scrollableTarget="scroll"
                    loader={<div className="h-fit flex justify-center w-full overflow-hidden"><CircularProgress color="inherit"/></div>}
                    endMessage={
                        <div className="w-full flex justify-center mt-2 border-t-2 border-black">No more notifications</div>
                }
                    >
                        { items &&
                        items.map((item, index) => (
                            <NotificationCard key={index} notification={item} index={index} setItems={setItems}/>
                        ))}
                    </InfiniteScroll>
                    </div>

                    </div>

                    {/* {!isLoading && <NotificationCard notification={data.results[0]}/>} */}
                </div> 
            </div>
        </PageFrame>
    );
}
 
export default Notification;