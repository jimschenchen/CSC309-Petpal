// import { useContext } from "react";
// import { APIContext } from "../../contexts/APIContext";
// import { useLocation } from "react-router-dom"


const Sidebar = () => {
    // const { userName } = useContext(APIContext);
    // const location = useLocation();
    // const url = location.pathname;
    // const today = new Date();
    // var semester;

    // Script for sidebar
    let isSidebarVisible = false;
    const sidebar = document.getElementById('sidebar');
    const menuButtons = document.getElementById('menuButton');

    function toggleSidebar() {
        if (isSidebarVisible) {
        sidebar.style.transform = 'translateX(-100%)';
        isSidebarVisible = false;
        } else {
        sidebar.style.transform = 'translateX(0)';
        isSidebarVisible = true;
        }
    }
    // document.getElementById('menuButton').addEventListener('click', toggleSidebar);
    // document.getElementById('menuButton2').addEventListener('click', toggleSidebar);

    return <>
         <div id="sidebar" class="bg-background text-blue-gray-700 w-full h-max space-y-3 px-4 absolute inset-y-0 left-0 transform -translate-x-full z-50 pb-[25rem] lg:relative lg:w-64 lg:translate-x-0 transition-transform duration-200 ease-in-out">
          <a href="#" class="flex justify-center items-center sm:hidden pt-12">
            <img src="/src/img/logo.svg" class="mr-3 h-12" alt="PetPal logo" />
            <span class="self-center text-3xl font-extrabold text-white">PetPal</span>
          </a>

          <div id="filter_heading" class="pt-8 sm:pt-0 flex items-center">
            <span class="material-icons">
              filter_alt
            </span>
            <h2 class="text-2xl font-extrabold pl-3">Filtered By:</h2>
          </div>

          <h2 class="text-lg font-extrabold pl-3">Breed</h2>
          <div class="relative h-10 w-auto min-w-[100px]">
            <select name="breed" class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
              <option value="Any">Any</option>
              <option value="Shiba Inu">Shiba Inu</option>
              <option value="German Shepherds">German Shepherds</option>
              <option value="Ragdoll">Ragdoll</option>
              <option value="Guinea Pig">Guinea Pig</option>
              <option value="Husky">Husky</option>
              <option value="Bobcat">Bobcat</option>
            </select>
            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Select a breed
            </label>
          </div>

          <h2 class="text-lg font-extrabold pl-3">Age</h2>
          <div class="relative h-10 w-auto min-w-[100px]">
            <select name="age" class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
              <option value="Any">Any</option>
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="4">4 years</option>
              <option value="5">5+ years</option>
            </select>
            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Select a age
            </label>
          </div>

          <h2 class="text-lg font-extrabold pl-3">Size</h2>
          <div class="relative h-10 w-auto min-w-[100px]">
            <select name="size" class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
              <option value="Any">Any</option>
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">Large</option>
            </select>
            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Select a size
            </label>
          </div>

          <h2 class="text-lg font-extrabold pl-3">Gender</h2>
          <div class="relative h-10 w-auto min-w-[100px]">
            <select name="gender" class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
              <option value="Any">Any</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Select a gender
            </label>
          </div>

          <button
            id="filter_button"
            class="middle none center rounded-lg w-full bg-primary py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            Apply Filter
          </button>


          <div id="sort_heading" class="pt-8 sm:pt-4 flex items-center">
            <span class="material-icons">
              sort
            </span>
            <h2 class="text-2xl font-extrabold pl-3">Sorted By:</h2>
          </div>

          <div class="relative h-10 w-auto min-w-[100px]">
            <select name="sort" class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-primary focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
              <option value="Any">Any</option>
              <option value="name">Name:A-Z</option>
              <option value="date-newest">Date-newest</option>
              <option value="date-oldest">Date-oldest</option>
            </select>
          </div>

          <button
            id="sort_button"
            class="middle none center rounded-lg w-full bg-primary py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            Apply Sort
          </button>

          {/* <!-- mobile back button --> */}

          <button class="lg:hidden middle none center rounded-lg w-full bg-white py-3 px-6 font-sans text-xs font-bold uppercase text-primary shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" id="menuButton2">Back</button>
        </div>
    </>;
}

export default Sidebar;