const TabHeader = ({activeTab, setActiveTab}) => {
    const get_class = (id) => {
        if (activeTab === id) {
            return "active-signin-tab";
        }
        else {
            return "inactive-signin-tab";
        }
    }

    return ( 
        <div className="w-full flex justify-center items-center">
            <div className="flex w-full sm:w-[540px] mx-3 mt-3 items-end">
                <button id="seeker-tab" 
                className={get_class("seeker-tab")} 
                onClick={() => {setActiveTab('seeker-tab')}}>
                    <span>Pet Seeker</span>
                </button>
                <button id='shelter-tab' 
                className={(get_class("shelter-tab"))} 
                onClick={() => {setActiveTab('shelter-tab')}}>
                    <span>Pet Shelter</span>
                </button>
            </div>
        </div>
     );
}
 
export default TabHeader;