import { useContext, useEffect, useState } from "react";
import { APIContext } from "../../contexts/APIContext";
// import { useLocation } from "react-router-dom"

import { Request } from "../../utils/Request";

import Card from "../Card";
import Chip from "../Chip";

// var items = [
//   {
//       id: 1,
//       name: "Buddy",
//       breed: "Bobcat",
//       gender: "male",
//       age: "3",
//       size: "large",
//       date: "January 1",
//       imageUrl: "/src/img/cat114-sm.jpg",
//       link: "pet_details_and_crud/pet-details.html",
//       status: "Available",
//       status_color: "text-green-700"
//   },
//   {
//       id: 2,
//       name: "Cheems",
//       breed: "Shiba Inu",
//       gender: "male",
//       age: "3",
//       size: "small",
//       date: "January 10",
//       imageUrl: "https://imagevars.gulfnews.com/2023/08/22/Shiba-Inu-of-the-viral--Cheems--doge-meme-_18a1dc8b125_large.jpg",
//       link: "pet_details_and_crud/pet-details-Cheems.html",
//       status: "Available",
//       status_color: "text-green-700"
//   },
//   {
//       id: 3,
//       name: "Bob",
//       breed: "German Shepherds",
//       gender: "male",
//       age: "6",
//       size: "large",
//       date: "January 15",
//       imageUrl: "https://www.thesprucepets.com/thmb/2v3mFoE-mLVxNCPeKifiuIAONrA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-978711748-39cc1126c08c42eca3a4a255c1bb50ef.jpg",
//       link: "pet_details_and_crud/pet-details-pending.html",
//       status: "Pending",
//       status_color: "text-yellow-700"
//   },
//   {
//       id: 4,
//       name: "Luna",
//       breed: "Ragdoll",
//       gender: "female",
//       age: "1",
//       size: "small",
//       date: "January 28",
//       imageUrl: "https://assets.elanco.com/8e0bf1c2-1ae4-001f-9257-f2be3c683fb1/5b65b849-841f-4370-8030-95227c3d461e/ragdoll_cat_01401.jpg?w=3840&q=75&auto=format",
//       link: "pet_details_and_crud/pet-details-adopted.html",
//       status: "Adopted",
//       status_color: "text-red-700"
//   },
//   {
//       id: 5,
//       name: "Bella",
//       breed: "Guinea Pig",
//       gender: "female",
//       age: "2",
//       size: "small",
//       date: "January 18",
//       imageUrl: "https://petkeen.com/wp-content/uploads/2021/02/A-guinea-pig-running-around-in-the-garden_theianov_Shutterstock-1.webp",
//       link: "pet_details_and_crud/pet-details-withdraw.html",
//       status: "Withdrawn",
//       status_color: "text-red-700"
//   },
//   {
//       id: 6,
//       name: "Molly",
//       breed: "Husky",
//       gender: "female",
//       age: "4",
//       size: "medium",
//       date: "February 1",
//       imageUrl: "https://a-z-animals.com/media/siberian-husky-1.jpg",
//       link: "pet_details_and_crud/pet-details-Molly.html",
//       status: "Available",
//       status_color: "text-green-700"
//   },
// ];

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



    const getPetsList = async () => {
      try {
        const res = await Request("/pets/", "GET");
        console.log(res);
        setPets(res.results);
      } catch (err) {
        console.log(err);
      }
    }

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      getPetsList();
    }, [])

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return <>
        {/* <!-- Container wrapper --> */}
      <div id="container" className="flex-1 flex flex-col overflow-hidden">
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

        <div id="chip_row" className="flex items-center p-2">
          <div id="filter_row" className="flex item-center mr-4">

            {Object.entries(filters).filter(([key, value])  => {return value != "Any"}).map(([key, value]) => (
              <Chip key={key} label={key} value={value} c_color={chipColorMap[key]} />
            ))}

          </div>
          <div id="sort_row" className="flex item-center mr-4">


          </div>
        </div>


        <div id="main" className="flex-1 p-4 pt-0 overflow-y-auto">
          {/* <!-- ... main ... --> */}

          <div id="cardsContainer" className="flex justify-center flex-wrap">
            {pets.map(pet => (
              <Card key={pet.id} item={pet} />
            ))}
          </div>

          {/* <!-- ... main end ... --> */}
        </div>
      </div>
    </>;
}

export default Search;