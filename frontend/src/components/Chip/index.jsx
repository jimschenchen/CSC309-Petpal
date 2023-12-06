// import { useContext } from "react";
// import { APIContext } from "../../contexts/APIContext";
// import { useLocation } from "react-router-dom"


const Chip = ({label, value, c_color}) => {
    // const { userName } = useContext(APIContext);
    // const location = useLocation();
    // const url = location.pathname;
    // const today = new Date();
    // var semester;

    const chipClasses = `flex items-center center relative mx-1 select-none whitespace-nowrap rounded-lg ${c_color} py-1 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white`;

    return <>
        <div className={chipClasses} data-dismissible="chip">
            <div className="mr-0 mt-px flex-none">{label}: {value}</div>
        </div>
    </>;
}

export default Chip;