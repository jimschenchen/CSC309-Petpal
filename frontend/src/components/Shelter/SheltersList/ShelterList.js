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

  // responsively set the number of shelters per page
  var sheltersPerPage = 2 + window.innerWidth / 500;
  // var sheltersPerPage = 3;

  const loadHiddenItems = () => {
    if (hiddenShelters.length > 0) {
      const hiddenSheltersTemp = [...hiddenShelters];
      const nextItems = hiddenSheltersTemp.slice(0, sheltersPerPage);
      setShelters(prev => [...prev, ...nextItems]);
      setHiddenShelters(hiddenSheltersTemp.slice(sheltersPerPage));
    } else {
      setHasMorePage(false);
    }
  };

  const loadInitData = async () => {
    fetch(`https://petpal.api.jimschenchen.com/accounts/users/`,
    {
      method: "GET",
      headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${getUser().token}`},
    }
    )
    .then(res => res.json())
    .then(data => {
      const shelterData = [...data.results]
      setShelters(shelterData.slice(0, sheltersPerPage));
      setHiddenShelters(shelterData.slice(sheltersPerPage));

      if (shelterData.slice(sheltersPerPage).length == 0) {
        setHasMorePage(false);
      }
    });
  }

  useEffect(() => {
    loadInitData();
  }, []);

  const loadMoreShelters = () => {
    setTimeout(() => {
      loadHiddenItems();
      console.log('load more shelters', hiddenShelters.length, shelters.length);
    }, 1500)
  }
  return (
    <div className="md:flex-col w-full bg-white my-10">
      <h2 className="text-2xl font-bold mb-10 text-center">Shelters List</h2>
      {/* <div id="shelterList" className="flex flex-col gap-6 mb-4 mx-4">
            <InfiniteScroll
              className="w-full h-full flex flex-col gap-4 overflow-y-auto my-4 bottom-0"
              dataLength={shelters.length} //This is important field to render the next data
              next={loadMoreShelters}
              hasMore={hasMorePage}
              loader={<div className="flex justify-center items-center basis-full p-4 text-black">
                <CircularProgress color='inherit'/>
              </div>}
              endMessage={<>no</>}
            >
              {shelters.map(shelter => (
                <ShelterItem shelter={shelter} />
              ))}
              {isLoading && <center><CircularProgress color='inherit'/></center>}
            </InfiniteScroll>

          </div> */}

      <div
        id="scroll"
        className="overflow-y-auto h-[calc(100vh-9rem)] no-scrollbar flex flex-col gap-6 mb-4 mx-4"
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
              <ShelterItem shelter={shelter} />
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