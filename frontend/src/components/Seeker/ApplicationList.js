import { useEffect, useState } from "react";
import ApplicationItemSeeker from "./ApplicationItemSeeker";
import { getUser } from "../../utils/credential";
import useFetchGet from "../../utils/useFetch";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ManageApplication = () => {
  const page_size = 10;
  const [applications, setApplications] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [nextUrl, setNextUrl] = useState(null);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // filter & sort hooks
  const [searchParams, setSearchParams] = useSearchParams();

  const getFullUrl = () => {
    var base = `https://petpal.api.jimschenchen.com/applications/?page=1&page_size=${page_size}`;
    if (searchParams.get('sort_by')) {
      base += `&sort_by=${searchParams.get('sort_by')}`;
    }
    if (searchParams.get(`status`)) {
      base += `&status=${searchParams.get('status')}`;
    }
    return base;
  }

  // check search param valid
  useEffect(() => {
    if (searchParams.get('status') &&
      !['pending', 'accepted', 'withdrawn', 'denied'].includes(searchParams.get('status'))) {
      setSearchParams(prev => {
        prev.set('status', '');
        return prev;
      })
    }

    if (!searchParams.get('sort_by') &&
    !['created_time', 'last_updated_time', '-created_time', '-last_updated_time']
    .includes(searchParams.get('sort_by'))) {
      setSearchParams(prev => {
        prev.set('sort_by', '-last_updated_time');
        return prev
      })
    }
  }, []);

  //search param update
  useEffect(() => {
    setApplications([]);
    setIsLoading(true);
    setHasMore(true);
    console.log(getFullUrl());
    fetch(getFullUrl(),{
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getUser().token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setData(data);
      setIsLoading(false);
    })
    .catch(err => {
      setIsLoading(false);
      setError(err.message);
    });
  }, [searchParams]);

  useEffect(() => {
    if (data && !isLoading) {
      setApplications(data.results);
      console.log(data);
      if (data.next) {
        setHasMore(true);
        setNextUrl(data.next);
      }
      else {
        setHasMore(false);
      }
    }
  }, [data, isLoading]);


  const fetchData = () => {
    if (!hasMore) {return;}
    fetch(nextUrl, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getUser().token}`
      }
    })
    .then(res => {
      if (!res.ok) {
          throw Error('Could not fetch applications');
      }
      return res.json();
    })
    .then(data => {
      setApplications((prev) => [...prev, ...data.results]);
      if (data.next) {
          setHasMore(true);
          setNextUrl(data.next);
      }
      else {
          setHasMore(false);
      }
    });
  }

  const handleCreatedClick = () => {
    switch(searchParams.get('sort_by')) {
      case 'created_time':
        setSearchParams(prev => {
          prev.set('sort_by', '-created_time');
          return prev;
        });
        break;
      case '-created_time':
        setSearchParams(prev => {
          prev.set('sort_by', 'created_time');
          return prev;
        });
        break;
      default:
        setSearchParams(prev => {
          prev.set('sort_by', '-created_time');
          return prev;
        });
        break;
    }
  }

  const handleLastUpdateClick = () => {
    switch(searchParams.get('sort_by')) {
      case 'last_updated_time':
        setSearchParams(prev => {
          prev.set('sort_by', '-last_updated_time');
          return prev;
        });
        break;
      case '-last_updated_time':
        setSearchParams(prev => {
          prev.set('sort_by', 'last_updated_time');
          return prev;
        });
        break;
      default:
        setSearchParams(prev => {
          prev.set('sort_by', '-last_updated_time');
          return prev;
        });
        break;
    }
  }

  return (
        <div className="flex justify-center items-center">
            {/* <!-- Table --> */}
            <div className="flex mx-3 w-full max-w-[800px] bg-background flex-col">
              <div className="flex justify-between m-3">
              <div className="font-bold text-xl left-0">My Applications</div>
                <select defaultValue={searchParams.get('status')} 
                onChange={(e) => {setSearchParams(prev => {
                  if (e.target.value === 'all') {prev.set('status', '')}
                  else {prev.set('status', e.target.value)}
                  return prev;
                })}} className="rounded-lg focus:ring-primary focus:outline-none focus:ring-1 px-2 py-1 text-xs lg:text-base">
                    <option value="all">All</option>
                    <option value="pending" >Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="denied">Denied</option>
                    <option value="withdrawn">Withdrawn</option>
                </select>
              </div>
                
    
    
                {/* <!-- table head --> */}
                <div className="flex justify-between font-semibold border-b-2 border-black py-1">
                    <div className="sm:w-1/4  w-1/3 text-center">Pet name</div>

                    <button 
                    onClick={handleLastUpdateClick}
                    className="sm:w-1/4  w-1/3 text-center flex justify-center">
                      <div className="flex justify-center items-center">Last update</div>
                      <div className="flex flex-col justify-center">
                        {searchParams.get('sort_by')==='-last_updated_time' && 
                        <ArrowDropDownIcon fontSize="small"/>}
                        {searchParams.get('sort_by')==='last_updated_time' && 
                        <ArrowDropUpIcon fontSize="small"/>}
                      </div>
                    </button>

                    <button 
                    onClick={handleCreatedClick}
                    className="sm:w-1/4  w-1/3 text-center hidden sm:flex justify-center">
                      <div className="flex justify-center items-center">Created</div>
                      <div className="flex flex-col justify-center">
                      {searchParams.get('sort_by')==='-created_time' && 
                        <ArrowDropDownIcon fontSize="small"/>}
                        {searchParams.get('sort_by')==='created_time' && 
                        <ArrowDropUpIcon fontSize="small"/>}
                      </div>
                    </button>

                    <div className="sm:w-1/4  w-1/3 text-center">Status</div>
                </div>
                <div id="applications-content" 
                className="overflow-y-scroll 
                sm:h-[calc(100vh-11rem)] h-[calc(100vh-10.5rem)] no-scrollbar">
                  <div className="h-[calc(100vh-5rem)]">
                    <InfiniteScroll
                    dataLength={applications.length}
                    next={fetchData}
                    hasMore={hasMore}
                    scrollableTarget="applications-content"
                    loader={<div className="h-fit flex justify-center w-full overflow-hidden mt-3"><CircularProgress color="inherit"/></div>}
                    endMessage={<center className="text-sm">You have seen all applications</center>} 
                    >
                      {/* <!-- table row --> */}
                      {applications.map(application => (
                        <ApplicationItemSeeker 
                        key={application.id} 
                        ID={application.id} 
                        PetName={application.pet_name} 
                        LastUpdate={application.last_updated_time}
                        Created={application.created_time} 
                        Status={application.status}/>
                      ))}  
                    </InfiniteScroll>
                    {!isLoading && hasMore && <center className="text-sm">Scroll to see more applications</center>}
                    </div>

                </div>
                
            </div> 
          </div>

  );
};

export default ManageApplication;