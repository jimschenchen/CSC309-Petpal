import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
import { APIContext } from "../../contexts/APIContext";

const Layout = () => {
    const { userName } = useContext(APIContext);
    const location = useLocation();
    const url = location.pathname;
    const today = new Date();
    var semester;

    return <>
        <div id="body" class="class='flex flex-col min-h-screen bg-background'" >
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
        </div>
    </>;
}

export default Layout;