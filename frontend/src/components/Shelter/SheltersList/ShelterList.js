import useFlexFetch from '../../../utils/useFlexFetch';
import { useEffect, useState } from "react";
import ShelterItem from './ShelterItem';

import { CircularProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getUser } from '../../../utils/credential';

import {Request} from '../../../utils/Request';

const ShelterList = () => {
  const [shelters, setShelters] = useState([]);
  const [ hiddenShelters, setHiddenShelters ] = useState([]);
  const [ hasMorePage, setHasMorePage ] = useState(true);
  const [nextUrl, setNextUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // responsively set the number of shelters per page
  var sheltersPerPage = 10;
  // var sheltersPerPage = 3;

  const loadInitData = () => {
    fetch(`https://petpal.api.jimschenchen.com/accounts/shelters?page=1&page_size=${sheltersPerPage}`,
    {
      method: "GET",
      headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${getUser().token}`},
    }
    )
    .then(res => res.json())
    .then(data => {
      setShelters(data.results);
      if (data.next) {
        setNextUrl(data.next);
        setHasMorePage(true);
      }
      else {
        setHasMorePage(false)
      }
    });
  }

  useEffect(() => {
    loadInitData();
  }, []);

  const loadMoreShelters = () => {
    fetch(nextUrl,
    {
      method: "GET",
      headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${getUser().token}`},
    }
    )
    .then(res => res.json())
    .then(data => {
      setShelters(prev => [...prev, ...data.results]);
      if (data.next) {
        setNextUrl(data.next);
        setHasMorePage(true);
      }
      else {
        setHasMorePage(false)
      }
    });
  }
  return (
    <div className="md:flex-col w-full bg-white mt-4 rounded-lg">
      <h2 className="text-2xl font-bold mt-3 mb-10 text-center">Shelters List</h2>
      <div
        id="scroll"
        className="overflow-y-auto h-[calc(100vh-10.5rem)] md:h-[calc(100vh-12rem)]"
      >
        <div className="h-screen">
          <InfiniteScroll
            dataLength={shelters.length}
            next={loadMoreShelters}
            hasMore={hasMorePage}
            scrollableTarget="scroll"
            loader={
              <div className="h-fit flex justify-center w-full overflow-hidden">
                <CircularProgress color="inherit" />
              </div>
            }
            endMessage={
              <div className="w-full flex justify-center mt-2 border-t-2 border-black">
                No more shelters
              </div>
            }
          >
            {shelters.map(shelter => (
              <ShelterItem key={shelter.id} shelter={shelter} />
            ))}
          </InfiniteScroll>
          {hasMorePage && <center>Scroll to see more shelters</center>}
        </div>
      </div>



      <div className="flex justify-end"></div>
    </div>
  );
};

export default ShelterList;