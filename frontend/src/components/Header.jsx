import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Logo = () => (
    <Link href="/dist/index.html" className="flex items-center hover:scale-105">
        <img src={process.env.PUBLIC_URL + '/logo.svg'} className="mr-3 h-9 sm:h-10" alt="PetPal logo" />
        <span className="self-center text-2xl sm:text-3xl font-extrabold text-white">PetPal</span>
    </Link>
);

const Guest = () => (
    <div className="flex items-center">
        <Link className="navbar-btn-white">Log in</Link>
        <Link className="navbar-btn-white">Sign up</Link>
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

const UserMenu = ({userType}) => {
    if (userType === 'seeker') {
        return (
            <div className="bg-gray-50 rounded-lg z-50 absolute right-0 flex flex-col px-2">
                <ul className="pt-2 pb-1 px-2 border-primary border-b-2">
                    <li className="user-menu-item">
                    <Link>My Applications</Link>
                    </li>
                    <li className="user-menu-item">
                    <Link>Notification</Link>
                    </li>
                </ul>

                <ul className="pt-1 pb-2 px-2 border-primary">
                    <li className="user-menu-item">
                        <Link>Edit profile</Link>
                    </li>
                    <li className="user-menu-item">
                        <Link>Sign out</Link>
                    </li>
                </ul>
            </div>
        );
    }
    else if (userType === 'shelter'){
        return (
            <div 
            className="bg-gray-50 border-primary rounded-lg z-50 absolute right-0 flex flex-col px-2">

            <ul className="pt-2 pb-1 px-2 border-primary border-b-2">
                <li className="user-menu-item">
                <Link>Shelter details</Link>
                </li>
                <li className="user-menu-item">
                    <Link>Manage Pets</Link>
                </li>
                <li className="user-menu-item">
                    <Link>Manage Applications</Link>
                </li>
                <li className="user-menu-item">
                <Link>Notification</Link>
                </li>
            </ul>

            <ul className="pt-1 pb-2 px-2 border-primary">
                <li className="user-menu-item">
                    <Link>Edit profile</Link>
                </li>
                <li className="user-menu-item">
                <Link>Sign out</Link>
                </li>
            </ul>
            </div>
        );
    }
}

const Header = ({userType, username}) => {
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
        <header className="fixed w-full z-50">
        <nav className={"px-4 h-14 sm:h-16 " + headerColor()}>
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl h-full">
                <Logo/>
                {userType === 'guest' && <Guest/>}
                {userType !== 'guest' && <Logged username={username} showMenu={showMenu} setShowMenu={setShowMenu}/>}
            </div>
        </nav>
        {userType !== 'guest' && showMenu && <UserMenu userType={userType}/>}
        </header>
        </>
        
    );
}
 
export default Header;