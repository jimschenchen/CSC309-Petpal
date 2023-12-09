// import { useContext } from "react";
// import { APIContext } from "../../contexts/APIContext";
// import { useLocation } from "react-router-dom"

import { Link } from "react-router-dom";


const Card = ({item}) => {
    function formatDate(inputDate) {
        // Ensure inputDate is a Date object
        const date = new Date(inputDate);

        // Check for invalid date
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }

        // Array of month names
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Format the date
        const year = date.getFullYear();
        const month = months[date.getMonth()];
        const day = date.getDate();

        return `${month} ${day}, ${year}`;
    }

    const statusColor = (status) => {
        switch(status){
            case "available":
                return 'text-green-600';
            case "pending":
                return 'text-yellow-600';
            case "withdrawn":
                return 'text-red-600';
            case "adopted":
                return 'text-primary';
            default:
                return 'text-primary';
        }
    }

    return <>
        <Link to={`/pet_detail/${item.id}/`} className="relative flex flex-auto lg:flex-auto max-w-[15rem] max-h-[25rem] lg:max-w-[14rem] lg:max-h-[25rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md m-4 hover:shadow-2xl">
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
              <p className="mt-0 block font-sans text-sm font-normal leading-relaxed text-gray-700 antialiased">
                Shelter: {item.shelter_name}
              </p>
              <p className="mt-0 block font-sans text-sm font-normal leading-relaxed ${item.status_color} antialiased">
                  <span className="text-gray-700">Status: </span>
                  <span className={statusColor(item.status)}>{item.status}</span>
              </p>
          </div>

          <div className="flex items-center justify-between p-6 pt-3">
              <div className="flex items-center -space-x-3">
              </div>
              <p className="block font-sans text-sm font-light leading-relaxed text-inherit antialiased">
                Updated: {formatDate(item.last_updated_time)}
              </p>
          </div>
      </Link>
    </>;
}

export default Card;