// import { useContext } from "react";
// import { APIContext } from "../../contexts/APIContext";
// import { useLocation } from "react-router-dom"

import { Link } from "react-router-dom";


const Card = ({item}) => {
    return <>
        <Link to={`/pet_detail/${item.id}/`} className="relative flex flex-auto lg:flex-auto max-w-[15rem] max-h-[24rem] lg:max-w-[14rem] lg:max-h-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md m-4 hover:shadow-2xl">
          <div className="relative m-0 min-h-[10rem] max-h-[10rem] rounded-t-xl overflow-hidden bg-transparent bg-clip-border text-gray-700 shadow-none">
              <img className="object-cover h-full w-full" src={item.image} alt="Pet image" />
          </div>

          <div className="p-6 pt-3 overflow-hidden">

              <div className="flex-grow flex items-center pb-1">
                  <h4 className="block w-full text-center font-sans text-lg font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                      {item.name}
                  </h4>
              </div>

              <p className="mt-0 block font-sans text-sm font-normal leading-relaxed text-gray-700 antialiased">
                  Gender: {item.gender}
              </p>
              <p className="mt-0 block font-sans text-sm font-normal leading-relaxed text-gray-700 antialiased">
                  Breed: {item.breed}
              </p>
              <p className="mt-0 block font-sans text-sm font-normal leading-relaxed text-gray-700 antialiased">
                  Size: {item.size}
              </p>
              <p className="mt-0 block font-sans text-sm font-normal leading-relaxed text-gray-700 antialiased">
                  Age: {item.age} years old
              </p>
              <p className="mt-0 block font-sans text-sm font-normal leading-relaxed ${item.status_color} antialiased">
                  <span className="text-gray-700">Status: </span> {item.status}
              </p>
          </div>

          <div className="flex items-center justify-between p-6 pt-3">
              <div className="flex items-center -space-x-3">
              </div>
              <p className="block font-sans text-sm font-light leading-relaxed text-inherit antialiased">
                  Id: {item.id} | Shelter: {item.shelter_name}
              </p>
          </div>
      </Link>
    </>;
}

export default Card;