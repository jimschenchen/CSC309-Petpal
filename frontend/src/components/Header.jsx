import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

const Logged = ({username}) => {
    <button type="button" class="flex items-center justify-end hover:scale-105"
    onclick>
        <div className="material-icons text-white px-1 sm:px-2" style="font-size: 40px">account_circle</div>
        <div className="text-white font-medium text-sm sm:text-lg py-1 sm:py-2 px-0 mx-1">
            {username}
        </div>
    </button>
} 

const Header = ({userType, username}) => {
    const headerColor = (userType) => {
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
        <header>
        <nav className={"px-4 h-14 sm:h-16 " + headerColor()}>
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl h-full">
                <Logo/>
                {console.log(userType)}
                {userType === 'guest' && <Guest/>}
                {userType !== 'guest' && <Logged username={username}/>}
            </div>
        </nav>
        </header>
    );
}
 
export default Header;