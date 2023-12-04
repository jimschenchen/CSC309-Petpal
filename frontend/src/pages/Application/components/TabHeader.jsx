const TabHeader = ({activeTab, setActiveTab}) => {
    const get_class = (id) => {
        if (activeTab === id) {
            return "active-application-tab";
        }
        else {
            return "inactive-application-tab";
        }
    }

    return ( 
        <div className="w-full flex items-end z-0">
            <button id="msg-tab" className={get_class("msg-tab")} 
            onClick={() => {setActiveTab("msg-tab")}}>
                <span>Messages</span>
            </button>
            <button id='app-tab' className={get_class("app-tab")} 
            onClick={() => {setActiveTab("app-tab")}}>
                <span>Application Form</span>
            </button>
        </div>
     );
}
 
export default TabHeader;