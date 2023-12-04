import Sidebar from '../../components/Sidebar';
import Search from '../../components/Search';

const Home = () => {
    return <>
        <div className="flex h-screen bg-background">
            <Sidebar />
            <Search />
        </div>
    </>;
}

export default Home;