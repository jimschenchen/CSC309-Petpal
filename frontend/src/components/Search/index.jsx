import { useContext, useEffect, useState, useRef } from "react";
import { APIContext } from "../../contexts/APIContext";
// import { useLocation } from "react-router-dom"

import { Request } from "../../utils/Request";

import InfiniteScroll from 'react-infinite-scroll-component';

import Card from "../Card";
import Chip from "../Chip";

import CircularProgress from '@mui/material/CircularProgress';


var chipColorMap = {
  "breed": "bg-pink-500",
  'age': 'bg-blue-500',
  'size': 'bg-red-500',
  'gender': 'bg-green-500',
  'sort': 'bg-orange-500'
}

const Search = () => {
    // const { userName } = useContext(APIContext);
    // const location = useLocation();
    // const url = location.pathname;
    // const today = new Date();
    // var semester;

    // Script for sidebar
    const { sidebarVisible, setSidebarVisible } = useContext(APIContext);
    const { filters, setFilters } = useContext(APIContext);

    const [ pets, setPets ] = useState([]);

    const [ currentPage, setCurrentPage ] = useState(1);
    const [ hasMorePage, setHasMorePage ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(false);

    const infiniteScrollRef = useRef(null);

    // adaptive set the page_size
    var page_size = 8;
    if (window.innerWidth >= 2560) {
        page_size = 24
    } else if (window.innerWidth >= 1920) {
        page_size = 18
    } else {
        page_size = 8
    }

    const getNextPetsList = async (restPage = false) => {
      var currentPageTemp = currentPage;
      if (restPage) {
        currentPageTemp = 1;
        setCurrentPage(1);
      }

      console.log("currentPageTemp: " + currentPageTemp)

      var url = "/pets/?page=" + currentPageTemp + "&page_size=" + page_size + ""

      for (const [key, value] of Object.entries(filters)) {
        if (value !== "Any") {
          if (key === "sort") {
            url += "&" + "ordering" + "=" + value;
          } else {
            url += "&" + key + "=" + value;
          }
        }
      }

      try {
        const res = await Request(url, "GET");

        const newPets = res.results;
        if (restPage) {
          setPets(newPets);
        }
        else {
          setPets([...pets, ...newPets]);
        }

        if (res.next === null) {
          console.log("No more pets");
          setHasMorePage(false);
        }

        // setCurrentPage
        setCurrentPage(currentPageTemp + 1);

      } catch (err) {
        console.log(err);
      }
    }

    const fetchMorePets = () => {
      setTimeout(() => {
          getNextPetsList(false);
      }, 1000)
    }

    // Get infiniteScrollHeight
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const remInPixels = 12 * rootFontSize;
    const infiniteScrollHeight = window.innerHeight - remInPixels;

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      getNextPetsList(true);
    }, [])

    // Update filters
    useEffect(() => {
      setIsLoading(true);
      setPets([]);
      setTimeout(() => {
        getNextPetsList(true);
        setIsLoading(false);
      }, 1000)

    }, [filters]);


    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return <>
        {/* <!-- Container wrapper --> */}
      <div id="container" className="flex-1 flex flex-col">
        <div id="research_row" className="flex justify-between items-center p-4">
          {/* <!-- ... research_row ... --> */}

          <div className="relative flex flex-auto h-10">
            <input
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              required
            />
            <button
              className="!absolute right-1 top-1 z-10 select-none rounded bg-primary py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
              data-ripple-light="true"
            >
              Search
            </button>

            <label className="hidden lg:flex before:content[' '] after:content[' '] overflow-hidden pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Search for name, breed and more
            </label>

            <label className="flex lg:hidden before:content[' '] after:content[' '] overflow-hidden pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Search
            </label>
          </div>

          <button onClick={toggleSidebar} className="lg:hidden text-lg ml-2 px-1 py-1 bg-transparent text-primary rounded">Advance</button>
          {/* <!-- ... research_row end ... --> */}
        </div>

        <div id="chip_row" className="flex items-center p-2 mx-4">
          <div id="filter_row" className="flex item-center mr-4">
            {
              Object.entries(filters).filter(([key, value])  => {return key != "sort" && value != "Any"}).length > 0 ? <p className="text-base sm:text-xl pl-3 mr-4">Filtered by:</p> : ""
            }

            {Object.entries(filters).filter(([key, value])  => {return key != "sort" && value != "Any"}).map(([key, value]) => (
              <Chip key={key} label={key} value={value} c_color={chipColorMap[key]} />
            ))}

          </div>
          <div id="sort_row" className="flex item-center mr-4">
            {
              Object.entries(filters).filter(([key, value])  => {return key == "sort" && value != "Any"}).length > 0 ? <p className="text-base sm:text-xl pl-3 mr-4">Sorted by:</p> : ""
            }

            {Object.entries(filters).filter(([key, value])  => {return key == "sort" && value != "Any"}).map(([key, value]) => (
              <Chip key={key} label={key} value={value} c_color={chipColorMap[key]} />
            ))}

          </div>
        </div>


        <div id="main" className="flex-1 p-4 pt-0">
          {/* <!-- ... main ... --> */}

          <InfiniteScroll
            id="cardsContainer"
            ref={infiniteScrollRef}
            className="flex justify-center lg:justify-start flex-wrap pb-4 lg:pb-8 overflow-y-auto"
            dataLength={pets.length} //This is important field to render the next data
            next={fetchMorePets}
            hasMore={hasMorePage}
            loader={<div className="flex justify-center items-center basis-full p-4">
              <CircularProgress />
            </div>}
            height={infiniteScrollHeight}
            endMessage={
              <p className="flex justify-center items-center basis-full p-4">
                <b>Yay! You have seen it all</b>
              </p>
            }
          >

            {
              isLoading ? <div className="flex justify-center items-center basis-full p-4">
                <CircularProgress />
              </div> : ""
            }
            {pets.map(pet => (
              <Card key={pet.id} item={pet} />
            ))}

          </InfiniteScroll>

          {/* <!-- ... main end ... --> */}
        </div>
      </div>
    </>;
}

export default Search;