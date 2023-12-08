import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getUser, removeUser } from "../utils/credential";

const Logo = () => (
    <Link to="/" className="flex items-center hover:scale-105">
        <img src={process.env.PUBLIC_URL + '/logo.svg'} className="mr-3 h-9 sm:h-10" alt="PetPal logo" />
        <span className="self-center text-2xl sm:text-3xl font-extrabold text-white">PetPal</span>
    </Link>
);

const Guest = () => (
    <div className="flex items-center">
        <Link to='/auth/login' className="navbar-btn-white">Log in</Link>
        <Link to='/auth/signup' className="navbar-btn-white">Sign up</Link>
    </div>
);

const Logged = ({username, showMenu, setShowMenu}) => (
    <button className="flex items-center justify-end hover:scale-105"
    onClick={() => setShowMenu(!showMenu)}>
        <AccountCircleIcon fontSize="large" style={{ color: 'white' }}/>
        <div className="text-white font-medium text-sm sm:text-lg py-1 sm:py-2 px-0 mx-1">
            {username}
        </div>
    </button>
);

const UserMenu = ({userType, logout}) => {
    if (userType === 'seeker') {
        return (
            <div className="bg-gray-50 rounded-lg z-50 absolute right-0 flex flex-col px-2 border-2 border-primary">
                <ul className="pt-2 pb-1 px-2 border-primary border-b-2">
                    <li className="user-menu-item">
                    <Link to = '/my_applications'>My Applications</Link>
                    </li>
                    <li className="user-menu-item">
                    <Link to='/notification'>Notification</Link>
                    </li>
                </ul>

                <ul className="pt-1 pb-2 px-2 border-primary">
                    <li className="user-menu-item">
                        <Link to = {`/seeker/${getUser().userId}/`}>Edit profile</Link>
                    </li>
                    <li className="user-menu-item">
                        <button onClick={() => {removeUser(); logout()}}>Sign out</button>
                    </li>
                </ul>
            </div>
        );
    }
    else if (userType === 'shelter'){
        return (
            <div 
            className="bg-gray-50 border-primary border-2 rounded-lg z-50 absolute right-0 flex flex-col px-2">

            <ul className="pt-2 pb-1 px-2 border-primary border-b-2">
                <li className="user-menu-item">
                <Link to={`/shelter_detail/${getUser().userId}`}>Shelter details</Link>
                </li>
                <li className="user-menu-item">
                    <Link to={`/manage_pets`}>Manage Pets</Link>
                </li>
                <li className="user-menu-item">
                    <Link to={`/manage_applications`}>Manage Applications</Link>
                </li>
                <li className="user-menu-item">
                <Link to='/notification'>Notification</Link>
                </li>
            </ul>

            <ul className="pt-1 pb-2 px-2 border-primary">
                <li className="user-menu-item">
                    <Link to={`/shelter/${getUser().userId}`}>Edit profile</Link>
                </li>
                <li className="user-menu-item">
                <button onClick={() => {removeUser(); logout();}}>Sign out</button>
                </li>
            </ul>
            </div>
        );
    }
}

const Header = ({userType, username, logout}) => {
    const [showMenu, setShowMenu] = useState(false);

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

    return ( 
        <>
        <header className="w-full z-50">
        <nav className={"px-4 h-10 sm:h-12 " + headerColor()}>
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen h-full">
                <Logo/>
                {userType === 'guest' && <Guest/>}
                {userType !== 'guest' && <Logged username={username} showMenu={showMenu} setShowMenu={setShowMenu}/>}
            </div>
        </nav>
        {userType !== 'guest' && showMenu && <UserMenu userType={userType} logout={logout}/>}
        </header>
        </>
        
    );
}
 
export default Header;