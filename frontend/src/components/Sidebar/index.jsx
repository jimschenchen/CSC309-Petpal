import React, { useState, useEffect } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import { useContext } from "react";
import { APIContext } from "../../contexts/APIContext";
// import { useLocation } from "react-router-dom"

import useFetchGet from "../../utils/useFetch";
import { Request } from "../../utils/Request";

import { useSearchParams } from "react-router-dom";

import { getUser } from "../../utils/credential";


const Sidebar = () => {
    // Set mini sidebar color by User type
    const userInfo = getUser();
    const userType = userInfo.userType;
    const headerColor = () => {
      if (userType === 'seeker') {
          return "bg-seeker";
      }
      else if (userType === 'shelter') {
          return "bg-shelter";
      }
      else {
          return "bg-guest";
      }
    }

    // Search Parameter
    const [ searchParams, setSearchParams ] = useSearchParams({
      name: "Any",
      breed: "Any",
      age: "Any",
      size: "Any",
      gender: "Any",
      sort: "Any",
      status: "Any",
      shelter: "Any",
    });


    // Script for sidebar
    const { sidebarVisible, setSidebarVisible } = useContext(APIContext);
    const { filters, setFilters } = useContext(APIContext);
    const [ filtersTemp, setFiltersTemp ] = useState(filters);
    const [ filterMeta, setFilterMeta ] = useState({});

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const sidebarClasses = `bg-background w-full overflow-y-scroll lg:h-[calc(100vh-10rem)] no-scrollbar mr-0 rounded-lg bg-gray-100 border-gray-100 lg:m-4 px-4 pb-4 border-4 space-y-3 z-50 lg:relative lg:w-64 transition-transform duration-200 ease-in-out ${
        sidebarVisible ? 'absolute inset-y-0 left-0 translate-x-0' : 'absolute inset-y-0 left-0 lg:translate-x-0 -translate-x-[110%]'
    }`;

    const toggleFilter = () => {
        setFilters({...filtersTemp});
        // Only display non-default filters
        const newSearchParams = Object.fromEntries(
          Object.entries(filtersTemp).filter(([key, value]) => value !== "Any")
        );
        setSearchParams(newSearchParams);
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFiltersTemp({ ...filtersTemp, [name]: value });
    };

    const initialFiltersMeta = async () => {
      const meta = await Request('/pets/meta/', "GET");
      setFilterMeta(meta);
      console.log("meta", meta)
    }

    const loadSearchParamFilters = () => {
      const searchParamsFilters = {
        name: searchParams.get("name") || "Any",
        breed: searchParams.get("breed") || "Any",
        age: searchParams.get("age") || "Any",
        size: searchParams.get("size") || "Any",
        gender: searchParams.get("gender") || "Any",
        sort: searchParams.get("sort") || "Any",
        status: searchParams.get("status") || "Any",
        shelter: searchParams.get("shelter") || "Any",
      };
      setFilters(searchParamsFilters);
      setFiltersTemp(searchParamsFilters);
    }


    useEffect(() => {
      initialFiltersMeta();
      loadSearchParamFilters();
    }, [])

    return <>
         <div id="sidebar" className={sidebarClasses}>

          <div id="filter_heading" className="pt-2 lg:pt-0 flex items-center">
            <FilterAltIcon/>
            <h2 className="text-2xl font-extrabold pl-3">Filtered By:</h2>
          </div>

          <h2 className="text-lg font-extrabold pl-3">Shelter</h2>
          <div className="relative h-10 w-auto min-w-[100px]">
            <select name="shelter"
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    value={filtersTemp.shelter}
                    onChange={handleFilterChange}>

              <option value="Any">Any</option>
              {/* shelter: [name, id] */}
              {filterMeta.shelter && filterMeta.shelter.sort((item) => {return item[0]}).map((shelter) => ((
                <option key={shelter[1]} value={shelter[1]}>{shelter[0]}</option>
              )))}
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Select a shelter
            </label>
          </div>

          <h2 className="text-lg font-extrabold pl-3">Status</h2>
          <div className="relative h-10 w-auto min-w-[100px]">
            <select name="status"
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    value={filtersTemp.status}
                    onChange={handleFilterChange}>

              <option value="Any">Any</option>
              {filterMeta.status && filterMeta.status.sort().map((status) => ((
                <option key={status} value={status}>{status}</option>
              )))}
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Select a status
            </label>
          </div>

          <h2 className="text-lg font-extrabold pl-3">Breed</h2>
          <div className="relative h-10 w-auto min-w-[100px]">
            <select name="breed"
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    value={filtersTemp.breed}
                    onChange={handleFilterChange}>
              <option value="Any">Any</option>
              {filterMeta.breed && filterMeta.breed.sort().map((breed) => ((
                <option key={breed} value={breed}>{breed}</option>
              )))}
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Select a breed
            </label>
          </div>

          <h2 className="text-lg font-extrabold pl-3">Age</h2>
          <div className="relative h-10 w-auto min-w-[100px]">
            <select name="age"
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    value={filtersTemp.age}
                    onChange={handleFilterChange}>

              <option value="Any">Any</option>
              {filterMeta.age && filterMeta.age.sort().map((age) => ((
                <option key={age} value={age}>{age + (age === 1 ? " year" : " years")}</option>
              )))}
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Select a age
            </label>
          </div>

          <h2 className="text-lg font-extrabold pl-3">Size</h2>
          <div className="relative h-10 w-auto min-w-[100px]">
            <select name="size"
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    value={filtersTemp.size}
                    onChange={handleFilterChange}>
              <option value="Any">Any</option>
              {filterMeta.size && filterMeta.size.sort().map((size) => ((
                <option key={size} value={size}>{size}</option>
              )))}
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Select a size
            </label>
          </div>

          <h2 className="text-lg font-extrabold pl-3">Gender</h2>
          <div className="relative h-10 w-auto min-w-[100px]">
            <select name="gender" 
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    value={filtersTemp.gender}
                    onChange={handleFilterChange}>
              <option value="Any">Any</option>
              {filterMeta.gender && filterMeta.gender.sort().map((gender) => ((
                <option key={gender} value={gender}>{gender}</option>
              )))}
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Select a gender
            </label>
          </div>

          <button
            id="filter_button"
            onClick={toggleFilter}
            className="middle none center rounded-lg w-full bg-primary py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            Apply Filter
          </button>


          <div id="sort_heading" className="pt-2 lg:pt-4 flex items-center">
            <SortIcon/>
            <h2 className="text-2xl font-extrabold pl-3">Sorted By:</h2>
          </div>

          <div className="relative h-10 w-auto min-w-[100px]">
            <select name="sort"
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-primary focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    value={filtersTemp.sort}
                    onChange={handleFilterChange}>
              <option value="Any">Any</option>
              <option value="name">Name:A-Z</option>
              <option value="age">Age</option>
              <option value="size">Size</option>
            </select>
          </div>
          <button
            id="sort_button"
            onClick={toggleFilter}
            className="middle none center rounded-lg w-full bg-primary py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            Apply Sort
          </button>

          {/* <!-- mobile back button --> */}

          <button onClick={toggleSidebar} className="lg:hidden middle none center rounded-lg w-full bg-white py-3 px-6 font-sans text-xs font-bold uppercase text-primary shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Back</button>
        </div>
    </>;
}

export default Sidebar;