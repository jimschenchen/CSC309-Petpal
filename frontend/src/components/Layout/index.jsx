import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
import { APIContext } from "../../contexts/APIContext";
import './style.css';

const Layout = () => {
    const { userName } = useContext(APIContext);
    const location = useLocation();
    const url = location.pathname;
    const today = new Date();
    var semester;

    switch (today.getMonth()) {
        case 1:
        case 2:
        case 3:
        case 4:
            semester = "Winter";
            break;
        case 5:
        case 6:
        case 7:
        case 8:
            semester = "Summer";
            break;
        case 9:
        case 10:
        case 11:
        case 12:
            semester = "Fall";
            break;
        default:
            semester = "Unknown";
    }

    return <>
        <header>
            <div>
                <Link to="/" className={url === "/" ? "active" : ""}>Home</Link>
                <Link to="/players" className={url.startsWith("/players") ? "active" : ""}>Players</Link>
                <Link to="/teams" className={url.startsWith("/teams") ? "active" : ""}>Teams</Link>
                <Link to="/games" className={url.startsWith("/games") ? "active" : ""}>Games</Link>
            </div>
            <div>Hello, {userName}</div>
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            &copy; CSC309 Lecture 14c, {semester} {today.getFullYear()}.
        </footer>
    </>;
}

export default Layout;